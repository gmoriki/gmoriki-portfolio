import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WorkFormData {
  year: string;
  date: string;
  title: string;
  description: string;
  organization?: string;
  link?: string;
  image?: string;
  tags: string;
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<number | null>(null);
  const [formData, setFormData] = useState<WorkFormData>({
    year: "",
    date: "",
    title: "",
    description: "",
    organization: "",
    link: "",
    image: "",
    tags: "",
  });

  const { data: works, isLoading, refetch } = trpc.works.list.useQuery();
  const createMutation = trpc.works.create.useMutation({
    onSuccess: () => {
      toast.success("実績を追加しました");
      setIsCreateOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });

  const updateMutation = trpc.works.update.useMutation({
    onSuccess: () => {
      toast.success("実績を更新しました");
      setEditingWork(null);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });

  const deleteMutation = trpc.works.delete.useMutation({
    onSuccess: () => {
      toast.success("実績を削除しました");
      refetch();
    },
    onError: (error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      year: "",
      date: "",
      title: "",
      description: "",
      organization: "",
      link: "",
      image: "",
      tags: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    if (editingWork) {
      updateMutation.mutate({
        id: editingWork,
        ...formData,
        tags: tagsArray,
      });
    } else {
      createMutation.mutate({
        ...formData,
        tags: tagsArray,
      });
    }
  };

  const handleEdit = (work: any) => {
    setEditingWork(work.id);
    setFormData({
      year: work.year,
      date: work.date,
      title: work.title,
      description: work.description,
      organization: work.organization || "",
      link: work.link || "",
      image: work.image || "",
      tags: work.tags.join(", "),
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("本当に削除しますか？")) {
      deleteMutation.mutate({ id });
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p>ログインが必要です</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">実績管理</h1>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新規追加
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>実績を追加</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="year">年</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2023年"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">日付</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2023年12月6-7日"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title">タイトル</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">説明</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organization">組織名（オプション）</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="link">リンク（オプション）</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="image">画像URL（オプション）</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">タグ（カンマ区切り）</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="研修, 講演"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    追加
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : works && works.length > 0 ? (
          <div className="grid gap-4">
            {works.map((work) => (
              <Card key={work.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-muted-foreground">{work.year}</span>
                      <span className="text-sm text-muted-foreground">{work.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                    <p className="text-muted-foreground mb-3">{work.description}</p>
                    {work.organization && (
                      <p className="text-sm text-muted-foreground mb-2">組織: {work.organization}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {work.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 text-sm font-bold text-white rounded-md"
                          style={{ backgroundColor: "oklch(0.35 0.08 160)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {work.link && (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        リンクを開く →
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog
                      open={editingWork === work.id}
                      onOpenChange={(open) => {
                        if (!open) {
                          setEditingWork(null);
                          resetForm();
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => handleEdit(work)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>実績を編集</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="edit-year">年</Label>
                            <Input
                              id="edit-year"
                              value={formData.year}
                              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-date">日付</Label>
                            <Input
                              id="edit-date"
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-title">タイトル</Label>
                            <Input
                              id="edit-title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">説明</Label>
                            <Textarea
                              id="edit-description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                              }
                              rows={4}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-organization">組織名（オプション）</Label>
                            <Input
                              id="edit-organization"
                              value={formData.organization}
                              onChange={(e) =>
                                setFormData({ ...formData, organization: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-link">リンク（オプション）</Label>
                            <Input
                              id="edit-link"
                              type="url"
                              value={formData.link}
                              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-image">画像URL（オプション）</Label>
                            <Input
                              id="edit-image"
                              type="url"
                              value={formData.image}
                              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-tags">タグ（カンマ区切り）</Label>
                            <Input
                              id="edit-tags"
                              value={formData.tags}
                              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                              required
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setEditingWork(null);
                                resetForm();
                              }}
                            >
                              キャンセル
                            </Button>
                            <Button type="submit" disabled={updateMutation.isPending}>
                              {updateMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              更新
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(work.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">実績データがありません</p>
            <Button className="mt-4" onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              最初の実績を追加
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
