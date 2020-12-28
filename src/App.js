import "./styles.css";
import React, { Suspense, useEffect, useState, useRef } from "react";
// import styled from "styled-components";

// const FlixWrapper = styled.div`
//   height: 100%;
//   display: block;
//   margin: 1em;
//   font-family: "Helvetica Neue";
//   font-size: 3em;
//   color: #ffffff;
// `;
export default function App() {
  const canvasref = useRef(null);
  const contextref = useRef(null);
  const [drawing, setDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasref.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");
    contextref.current = context;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = "5";
  }, []);
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextref.current.beginPath();
    contextref.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const endDrawing = () => {
    contextref.current.closePath();
    setDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextref.current.lineTo(offsetX, offsetY);
    contextref.current.stroke();
  };

  const colours = ["#FF0000", "#0000FF", "#FFFF00", "#00FF00"];
  return (
    <div className="App">
      <p style={{ margin: "0em" }}>Start Drawing </p>
      <div
        style={{
          background: "white",
          height: "40em",
          width: "90%",
          padding: "2%",
          border: "black 2px solid",
          margin: "1em",
          position: "relative"
        }}
      >
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasref}
        />
      </div>
      <div className="colors" style={{ display: "flex" }}>
        {colours.map((color) => (
          <div
            key={color}
            style={{
              background: `${color}`,
              height: "5%",
              width: "5%",
              padding: "2%"
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
