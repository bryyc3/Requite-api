ALTER TABLE `business` ADD `point_tracker` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `business` ADD `visit_tracker` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `business` ADD `referral_tracker` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `business` ADD `ppd` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `business` DROP COLUMN `reward_tracker`;