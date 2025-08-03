"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { Fragment, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAction } from "@/actions/notes";
import "@/styles/ai-responses.css";

type Props = {
  user: User | null;
};

const AskAIBtn = ({ user }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  console.log(isOpen);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOnOpenChange = (open: boolean) => {
    if (!user) {
      router.push("/");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
      setIsOpen(open);
    }
  };

  const handleInput = () => {
    const textarea = textAreaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textAreaRef.current?.focus();
  };

  const handleSubmit = () => {
    console.log("submitting to AI...");

    if (!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAction(newQuestions, responses);
      setResponses((prev) => [...prev, response]);
      setTimeout(scrollToBottom, 100);
    });
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // console.log(user?.email);
  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask AI</Button>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ask AI about your notes</DialogTitle>
          <DialogDescription>
            Our AI can asnwer questions about all of your notes.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-8">
          {questions.map((question, index) => {
            return (
              <Fragment key={index}>
                <p className="ml-auto max-w-[60%] rounded-md bg-muted px-2 py-1 text-sm">
                  {question}
                </p>
                {responses[index] && (
                  <p
                    className="bot-response text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: responses[index] }}
                  />
                )}
              </Fragment>
            );
          })}
          {isPending && <p className="animate-pulse text-sm">Thinking....</p>}
        </div>
        <div
          className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
          onClick={handleClickInput}
        >
          <Textarea
            ref={textAreaRef}
            placeholder="Ask me anything about your notes...."
            className="resize-none rounded-none border-none bg-transparent p-0 shadow-none placeholder:text-muted-foreground focuse-visible:ring-0 focus-visible:ring-offset-0 "
            style={{ minHeight: "0", lineHeight: "normal" }}
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <Button className="ml-auto size-8 rounded-full">
            <ArrowUpIcon className="text-background" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskAIBtn;
