import React from "react";
import EmojiPicker from "emoji-picker-react";
import "./Emojis.css"


export const Emojis = ({setInput}) => {
  return (
    <div>
      <EmojiPicker width={"100%"} height={200} searchDisabled={true} skinTonesDisabled={true} onEmojiClick={(emoji)=>setInput(current => current + emoji.emoji)}/>
    </div>
  );
};
