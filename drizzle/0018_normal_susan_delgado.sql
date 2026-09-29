ALTER TABLE `Business_Tier` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `Business_Tier` ADD PRIMARY KEY(`id`);