const createElem = (drop: { x: string; y: string; d: any[] }) => {
  const elem = document.createElement("div");
  elem.style.position = "absolute";
  elem.style.marginTop = drop.x + "px";
  elem.style.marginLeft = drop.y + "px";
  elem.style.fontSize = "18px";
  elem.innerHTML = drop.d.reduce((acc: string, c: string) => (acc += "<br/>" + c), "");
  elem.style["color"] = `rgb(21, ${100 + drop.d.length * 10}, 21)`;
  return elem;
};

export const render = (matrix: any[]) => {
  const matrixBody = document.getElementById("matrix");
  if (!matrixBody) throw new Error("HTML element matrix doesn't exist");
  const container = document.createElement("div");
  container.style.position = "relative";
  matrixBody.innerHTML = "";
  matrix.forEach((m: any) => container.appendChild(createElem(m)));
  matrixBody.appendChild(container);
};
