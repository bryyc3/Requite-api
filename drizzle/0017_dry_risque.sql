ALTER TABLE `Business_Tier` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `Business_Tier` MODIFY COLUMN `id` varchar(36);