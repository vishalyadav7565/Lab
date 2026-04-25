import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getTestContent(id: string) {
  try {
    // ✅ FIXED PATH
    const filePath = path.join(process.cwd(), "app", "content", `${id}.md`);

    if (!fs.existsSync(filePath)) {
      console.log("File not found:", filePath);
      return "<p>Content not found</p>";
    }

    const file = fs.readFileSync(filePath, "utf-8");

    const { content } = matter(file);

    const processed = await remark().use(html).process(content);

    return processed.toString();
  } catch (error) {
    console.log(error);
    return "<p>Error loading content</p>";
  }
}