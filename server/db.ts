import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, InsertWork, users, works, Work } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Works queries
export async function getAllWorks(): Promise<Work[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get works: database not available");
    return [];
  }

  const result = await db.select().from(works);
  return result;
}

export async function getWorkById(id: number): Promise<Work | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get work: database not available");
    return undefined;
  }

  const result = await db.select().from(works).where(eq(works.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createWork(work: InsertWork): Promise<Work> {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot create work: database not available");
  }

  const result = await db.insert(works).values(work);
  const insertedId = Number(result[0].insertId);
  const inserted = await getWorkById(insertedId);
  if (!inserted) {
    throw new Error("[Database] Failed to retrieve created work");
  }
  return inserted;
}

export async function updateWork(id: number, work: Partial<InsertWork>): Promise<Work> {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot update work: database not available");
  }

  await db.update(works).set(work).where(eq(works.id, id));
  const updated = await getWorkById(id);
  if (!updated) {
    throw new Error("[Database] Failed to retrieve updated work");
  }
  return updated;
}

export async function deleteWork(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot delete work: database not available");
  }

  await db.delete(works).where(eq(works.id, id));
}
