ALTER TABLE `Reward` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `Reward` ADD PRIMARY KEY(`id`);