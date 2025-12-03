CREATE TABLE `works` (
	`id` int AUTO_INCREMENT NOT NULL,
	`year` varchar(10) NOT NULL,
	`date` varchar(100) NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`organization` text,
	`link` text,
	`image` text,
	`tags` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `works_id` PRIMARY KEY(`id`)
);
