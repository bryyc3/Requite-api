ALTER TABLE `Business_Tier` ADD `normalized_name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Business_Tier` ADD CONSTRAINT `name` UNIQUE(`business_id`,`tier_name`);