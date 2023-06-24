"use client";

import { useRef, useState, useEffect } from "react";
import { IoSendSharp } from "react-icons/io5";
import Sidebarmenu from "../components/Sidebar";
import { useParams } from "next/navigation";

export default function Home() {
  const { data_id } = useParams();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [docName, setDocName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [messageState, setMessageState] = useState({
    messages: [],
    history: [],
  });

  const { messages, history } = messageState;

  const endOfChatRef = useRef(null);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUpload = async (file) => {
    let newFileName = "";

    setMessageState((state) => ({
      ...state,
      messages: [],
      history: [],
    }));

    const body = new FormData();
    body.append("file", file);
    setAnalyzing(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      try {
        const json = await res.json();
        newFileName = json.namespace;
        setDocName(newFileName);
      } catch (parseError) {
        console.error("Could not parse response: ", parseError);
      }
      setAnalyzing(false);
      setMessageState((state) => ({
        ...state,
        messages: [
          {
            message: "Hi, what would you like to learn about this document?",
            type: "ai",
          },
        ],
        history: [],
      }));
    } catch (err) {
      console.log("err", err);
      setAnalyzing(false);
    }
    return newFileName;
  };

  // Send query
  async function sendQuery(e) {
    e.preventDefault();
    setError(null);
    if (!query) {
      alert("Please input a question");
      return;
    }
    const question = query;
    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: "human",
          message: question,
        },
        {
          type: "ai",
          message: "...",
        },
      ],
    }));
    setQuery("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          history,
          docName,
        }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => {
          const messages = state.messages.filter(
            (m) => m.message !== "..." // remove loading message
          );
          return {
            ...state,
            messages: [
              ...messages,
              {
                type: "ai",
                message: data.text,
                sourceDocs: data.sourceDocuments,
              },
            ],
            history: [...state.history, [question, data.text]],
          };
        });
      }

      //scroll to bottom
      // messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setError("An error occurred while fetching the data. Please try again.");
      console.log("error", error);
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebarmenu handleUpload={handleUpload} />
      <div className="flex flex-col flex-1 items-center justify-between">
        <div className="text-5xl font-extrabold bg-gradient-to-r from-teal-300 via-teal-600 to-teal-300 bg-clip-text text-transparent sm:text-5xl p-2">
          Chat with any document
        </div>
        {messageState.messages.message ===
        "Hi, what would you like to learn about this document?" ? (
          <h1 className="font-bold text-gray-500 text-lg mt-2">{`Chat with ${docName}`}</h1>
        ) : null}
        {analyzing ? (
          <div className="my-2">
            Analyzing<span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        ) : (
          <div className="w-[50%]">
            <div className="min-w-[600px] drop-shadow-xl">
              <div className="flex flex-col rounded ">
                <div className="flex-grow p-4">
                  {messages.map((item, idx) => (
                    <div key={idx} className="flex flex-col drop-shadow-xl">
                      {item.type === "ai" ? (
                        <div className="px-3 py-1 m-3 max-w-[60%] rounded bg-gray-300 self-start">
                          {item.message === "..." ? (
                            <>
                              <span className="dot">.</span>
                              <span className="dot">.</span>
                              <span className="dot">.</span>
                            </>
                          ) : (
                            <p>{item.message}</p>
                          )}
                        </div>
                      ) : (
                        <p className="px-3 py-1 m-3 max-w-[60%] rounded bg-teal-500 self-end">
                          {item.message}
                        </p>
                      )}
                    </div>
                  ))}

                  <div ref={endOfChatRef} />
                </div>
              </div>
            </div>
          </div>
        )}

        <form
          className="flex flex-row items-center w-[50%] p-10 pr-0 mt-auto"
          onSubmit={sendQuery}
        >
          <input
            className="rounded border-2 border-gray-200 text-black px-2 py-1 w-full h-10 focus:border-teal-500 focus:outline-none focus:ring-0 placeholder text-sm"
            placeholder="Ask any question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="ml-2 px-3 py-1 h-10 hover:bg-gray-200 rounded"
            onClick={sendQuery}
          >
            <IoSendSharp color="teal" />
          </button>
        </form>
      </div>
    </div>
  );
}
