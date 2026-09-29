ALTER TABLE `Business_Tier` MODIFY COLUMN `tier_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Business_Tier` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `Business_Tier` ADD `id` varchar(36) NOT NULL;