CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp(3),
	`refresh_token_expires_at` timestamp(3),
	`scope` text,
	`password` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `business` (
	`id` varchar(36) NOT NULL,
	`business_name` varchar(255),
	`business_owner_email` varchar(255),
	`location` varchar(255),
	`business_id` varchar(255) NOT NULL,
	CONSTRAINT `business_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Redeemed_Reward` (
	`user_email` varchar(255),
	`business_id` varchar(255),
	`reward_name` varchar(255) NOT NULL,
	`redeem_code` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Reward` (
	`name` varchar(255) NOT NULL,
	`cost` int NOT NULL,
	`tier` varchar(255),
	`business_id` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `Subscription` (
	`points_accumulated` int NOT NULL,
	`tier` varchar(255),
	`user_id` varchar(255),
	`business_id` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `Tracked_Purchase` (
	`user_id` varchar(255),
	`item` varchar(255) NOT NULL,
	`business_id` varchar(255)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `business` ADD CONSTRAINT `business_business_id_user_id_fk` FOREIGN KEY (`business_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Redeemed_Reward` ADD CONSTRAINT `Redeemed_Reward_user_email_user_id_fk` FOREIGN KEY (`user_email`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Redeemed_Reward` ADD CONSTRAINT `Redeemed_Reward_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Reward` ADD CONSTRAINT `Reward_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Tracked_Purchase` ADD CONSTRAINT `Tracked_Purchase_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Tracked_Purchase` ADD CONSTRAINT `Tracked_Purchase_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);