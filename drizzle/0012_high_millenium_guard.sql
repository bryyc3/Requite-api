ALTER TABLE `Reward` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `Reward` MODIFY COLUMN `id` varchar(36);