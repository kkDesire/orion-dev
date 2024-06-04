CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`repo` text NOT NULL,
	`type` text NOT NULL,
	`icon` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`paid_status` text DEFAULT 'free' NOT NULL,
	`live_url` text,
	`access_url` text NOT NULL,
	`description_html` text NOT NULL,
	`description` text NOT NULL,
	`user_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`github_id` integer NOT NULL,
	`email` text NOT NULL,
	`login` text NOT NULL,
	`name` text,
	`avatar_url` text NOT NULL,
	`role_type` text DEFAULT 'creator',
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `modules_name_unique` ON `modules` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `modules_repo_unique` ON `modules` (`repo`);--> statement-breakpoint
CREATE UNIQUE INDEX `templates_name_unique` ON `templates` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_github_id_unique` ON `users` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_login_unique` ON `users` (`login`);