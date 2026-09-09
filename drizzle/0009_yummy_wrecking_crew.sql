ALTER TABLE `Reward` DROP FOREIGN KEY `Reward_business_id_Business_id_fk`;
--> statement-breakpoint
ALTER TABLE `Reward` ADD CONSTRAINT `Reward_business_id_Business_id_fk` FOREIGN KEY (`business_id`) REFERENCES `Business`(`id`) ON DELETE set null ON UPDATE no action;