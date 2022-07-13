import { useState, useEffect } from "react";
import Moveable from "react-moveable";

import { useSelector, useDispatch } from 'react-redux'
import { setQrScale, setQrTranslate } from "../store/store";

export default function MovingBody({canvasRef}) {
  const [target, setTarget] = useState();
  const dispatch = useDispatch();
  const translate = useSelector((state) => state.qr.translate);

    useEffect(() => {
      canvasRef.current.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
      setTarget(canvasRef.current);
  }, []);

  return <div className="container w-full h-full absolute top-0 right-0">
      <canvas ref={canvasRef} width={150} height={150} className="target" ></canvas>
      <Moveable target={target} draggable={true} throttleDrag={0} startDragRotate={0} throttleDragRotate={0} zoom={1}
          origin={true} padding={{"left":0,"top":0,"right":0,"bottom":0}}
          onDragStart={e=> {
            e.set(translate);
          }}
          onDrag={e => {
            dispatch(setQrTranslate(e.beforeTranslate));
            e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px)`;
          }}
          resizable={true}
          keepRatio={true}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          onResizeStart={(e) => {
            e.setOrigin(["%", "%"]);
            e.dragStart && e.dragStart.set(translate);
          }}
          onResize={(e) => {
            const beforeTranslate = e.drag.beforeTranslate;
            dispatch(setQrTranslate(beforeTranslate));
            dispatch(setQrScale([e.width, e.height]));
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }}
          />
  </div>;
}