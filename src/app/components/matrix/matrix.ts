const drop = (x: number, y: number) => ({ x, y, d: [], remove: false });
const random = (max: number) => Math.floor(Math.random() * Math.floor(max));
const randomChar = () => String.fromCharCode(random(128));

export const markForRemoval = (matrix: any[]) =>
  matrix.forEach(
    (drop: { remove: boolean; d: string | any[] }) => (drop.remove = drop.remove ? true : drop.d.length > 20)
  );
export const updateDrops = (matrix: any[]) =>
  matrix.forEach(
    (drop: { d: any[]; remove: any }) =>
      (drop.d = drop.remove
        ? drop.d.slice(1).map((e: any) => randomChar())
        : [randomChar(), ...drop.d.map((e: any) => randomChar())])
  );
export const updateMatrix = (matrix: any[], matrixElement: HTMLElement) => [
  ...matrix,
  drop(random(matrixElement.clientHeight) / 4, random(matrixElement.clientWidth)),
];
