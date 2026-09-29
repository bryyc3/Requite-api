ALTER TABLE `Reward` ADD `normalized_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Reward` ADD CONSTRAINT `reward_name` UNIQUE(`business_id`,`name`);