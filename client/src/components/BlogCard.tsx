import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function BlogCard({ title, description, date, readTime, tags }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <span className="text-sm text-muted-foreground">{readTime}</span>
          </div>
          <CardDescription>
            {format(new Date(date), 'MMMM dd, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
