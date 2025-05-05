CREATE TABLE `backups` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`paths` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`expression` text
);
