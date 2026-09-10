RENAME TABLE `Business` TO `business`;--> statement-breakpoint
ALTER TABLE `business` DROP FOREIGN KEY `Business_business_owner_email_user_email_fk`;
--> statement-breakpoint
ALTER TABLE `business` DROP FOREIGN KEY `Business_business_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `Business_Tier` DROP FOREIGN KEY `Business_Tier_business_id_Business_id_fk`;
--> statement-breakpoint
ALTER TABLE `Redeemed_Reward` DROP FOREIGN KEY `Redeemed_Reward_business_id_Business_id_fk`;
--> statement-breakpoint
ALTER TABLE `Reward` DROP FOREIGN KEY `Reward_business_id_Business_id_fk`;
--> statement-breakpoint
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_business_id_Business_id_fk`;
--> statement-breakpoint
ALTER TABLE `Tracked_Purchase` DROP FOREIGN KEY `Tracked_Purchase_business_id_Business_id_fk`;
--> statement-breakpoint
ALTER TABLE `business` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `business` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `Reward` ADD `description` varchar(255);--> statement-breakpoint
ALTER TABLE `business` ADD CONSTRAINT `business_business_owner_email_user_email_fk` FOREIGN KEY (`business_owner_email`) REFERENCES `user`(`email`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `business` ADD CONSTRAINT `business_business_id_user_id_fk` FOREIGN KEY (`business_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Business_Tier` ADD CONSTRAINT `Business_Tier_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Redeemed_Reward` ADD CONSTRAINT `Redeemed_Reward_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Reward` ADD CONSTRAINT `Reward_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Tracked_Purchase` ADD CONSTRAINT `Tracked_Purchase_business_id_business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE no action ON UPDATE no action;