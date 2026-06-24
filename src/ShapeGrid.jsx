import { useEffect, useRef } from "react";
import "./ShapeGrid.css";

function ShapeGrid({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  shape = "square",
  hoverTrailAmount = 0,
  className = "",
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);
  const trailCells = useRef([]);
  const cellOpacities = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHex = shape === "hexagon";
    const isTri = shape === "triangle";
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      numSquaresX.current = Math.ceil(rect.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(rect.height / squareSize) + 1;
    };

    const drawHex = (cx, cy, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const drawCircle = (cx, cy, size) => {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawTriangle = (cx, cy, size, flip) => {
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    const paintHover = (cellKey, drawCell) => {
      const alpha = cellOpacities.current.get(cellKey);
      if (!alpha) return;

      ctx.globalAlpha = alpha;
      drawCell();
      ctx.fillStyle = hoverFillColor;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawGrid = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const cols = Math.ceil(width / hexHoriz) + 3;
        const rows = Math.ceil(height / hexVert) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * hexHoriz + offsetX;
            const cy = row * hexVert + ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) + offsetY;
            const drawCell = () => drawHex(cx, cy, squareSize);

            paintHover(`${col},${row}`, drawCell);
            drawCell();
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const colShift = Math.floor(gridOffset.current.x / halfW);
        const rowShift = Math.floor(gridOffset.current.y / squareSize);
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / halfW) + 4;
        const rows = Math.ceil(height / squareSize) + 4;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * halfW + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip = ((col + colShift + row + rowShift) % 2 + 2) % 2 !== 0;
            const drawCell = () => drawTriangle(cx, cy, squareSize, flip);

            paintHover(`${col},${row}`, drawCell);
            drawCell();
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (shape === "circle") {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const drawCell = () => drawCircle(cx, cy, squareSize);

            paintHover(`${col},${row}`, drawCell);
            drawCell();
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const sx = col * squareSize + offsetX;
            const sy = row * squareSize + offsetY;

            const alpha = cellOpacities.current.get(`${col},${row}`);
            if (alpha) {
              ctx.globalAlpha = alpha;
              ctx.fillStyle = hoverFillColor;
              ctx.fillRect(sx, sy, squareSize, squareSize);
              ctx.globalAlpha = 1;
            }

            ctx.strokeStyle = borderColor;
            ctx.strokeRect(sx, sy, squareSize, squareSize);
          }
        }
      }
    };

    const updateCellOpacities = () => {
      const targets = new Map();

      if (hoveredSquare.current) {
        targets.set(`${hoveredSquare.current.x},${hoveredSquare.current.y}`, 1);
      }

      if (hoverTrailAmount > 0) {
        for (let i = 0; i < trailCells.current.length; i += 1) {
          const cell = trailCells.current[i];
          const key = `${cell.x},${cell.y}`;
          if (!targets.has(key)) {
            targets.set(key, (trailCells.current.length - i) / (trailCells.current.length + 1));
          }
        }
      }

      for (const [key] of targets) {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, 0);
        }
      }

      for (const [key, opacity] of cellOpacities.current) {
        const target = targets.get(key) || 0;
        const next = opacity + (target - opacity) * 0.15;
        if (next < 0.005) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, next);
        }
      }
    };

    const moveGrid = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }
    };

    const updateAnimation = () => {
      if (!reduceMotion) moveGrid();
      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const rememberHoveredCell = (cell) => {
      if (!hoveredSquare.current || hoveredSquare.current.x !== cell.x || hoveredSquare.current.y !== cell.y) {
        if (hoveredSquare.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquare.current });
          trailCells.current.length = Math.min(trailCells.current.length, hoverTrailAmount);
        }
        hoveredSquare.current = cell;
      }
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.round(adjustedX / hexHoriz);
        const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
        const row = Math.round((adjustedY - rowOffset) / hexVert);
        rememberHoveredCell({ x: col, y: row });
      } else if (isTri) {
        const halfW = squareSize / 2;
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const col = Math.round((mouseX - offsetX) / halfW);
        const row = Math.floor((mouseY - offsetY) / squareSize);
        rememberHoveredCell({ x: col, y: row });
      } else if (shape === "circle") {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const col = Math.round((mouseX - offsetX) / squareSize);
        const row = Math.round((mouseY - offsetY) / squareSize);
        rememberHoveredCell({ x: col, y: row });
      } else {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const col = Math.floor((mouseX - offsetX) / squareSize);
        const row = Math.floor((mouseY - offsetY) / squareSize);
        rememberHoveredCell({ x: col, y: row });
      }
    };

    const handleMouseLeave = () => {
      if (hoveredSquare.current && hoverTrailAmount > 0) {
        trailCells.current.unshift({ ...hoveredSquare.current });
        trailCells.current.length = Math.min(trailCells.current.length, hoverTrailAmount);
      }
      hoveredSquare.current = null;
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      drawGrid();
    });

    resizeObserver.observe(canvas);
    resizeCanvas();
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, shape, hoverTrailAmount]);

  return <canvas ref={canvasRef} className={`shapegrid-canvas ${className}`} />;
}

export default ShapeGrid;
