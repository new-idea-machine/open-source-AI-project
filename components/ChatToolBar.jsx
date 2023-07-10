function ChatToolBar() {
  return (
    <div className="chat-toolbar">
      {/* <div className="dropdown">
        <button className="link">Chat Styles</button>
        <div className="dropdown-menu">Dropdown Content</div>
      </div> */}

      <div className="ml-auto mr-2 text-2xl flex gap-x-1 whitespace-nowrap">
        <button className="pt-0.5" title="Share Chat">
          <svg
            className="cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300"
            stroke="currentColor"
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M901.84 949.376H69.841v-640h257.6l64.72-62.336-1.664-1.664H69.84c-35.344 0-64 28.656-64 64v640c0 35.344 28.656 64 64 64h832c35.343 0 64-28.656 64-64V448.704l-64 61.088v439.584zm-631.711-256l64.48-.001c44.865-254.496 266.545-448 533.889-448 11.215 0 21.855.096 32.623.176L783.873 362.783c-12.464 12.496-12.464 32.752 0 45.248 6.255 6.256 14.463 9.376 22.656 9.376s16.336-3.12 22.592-9.376l189.024-194L829.12 19.999c-12.464-12.496-32.72-12.496-45.248 0-12.464 12.496-12.464 32.752 0 45.248l116.176 116.16c-10.033-.016-19.968-.048-30.208-.048-303.056 0-553.567 221.952-599.711 512.017z" />
          </svg>
        </button>
        <button className="pt-0.5" title="Rename Chat">
          <svg
            className="cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300"
            stroke="currentColor"
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
          </svg>
        </button>
        <button className="pt-0.5" title="Export Chat">
          <svg
            className="cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300"
            stroke="currentColor"
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" />
          </svg>
        </button>
        <button className="pt-0.5" title="Reset Chat">
          <svg
            className="cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300"
            stroke="currentColor"
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M511.4 124C290.5 124.3 112 303 112 523.9c0 128 60.2 242 153.8 315.2l-37.5 48c-4.1 5.3-.3 13 6.3 12.9l167-.8c5.2 0 9-4.9 7.7-9.9L369.8 727a8 8 0 00-14.1-3L315 776.1c-10.2-8-20-16.7-29.3-26a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-7.5 7.5-15.3 14.5-23.4 21.2a7.93 7.93 0 00-1.2 11.1l39.4 50.5c2.8 3.5 7.9 4.1 11.4 1.3C854.5 760.8 912 649.1 912 523.9c0-221.1-179.4-400.2-400.6-399.9z" />
          </svg>
        </button>
        <button className="pt-0.5" title="Delete Chat">
          <svg
            className="cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300"
            stroke="currentColor"
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatToolBar;
