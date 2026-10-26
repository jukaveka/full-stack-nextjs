ALTER TABLE "reading_lists" DROP CONSTRAINT "reading_lists_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reading_lists" DROP CONSTRAINT "reading_lists_blog_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "reading_lists" ADD CONSTRAINT "reading_lists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_lists" ADD CONSTRAINT "reading_lists_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;