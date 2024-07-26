export interface UserSettingsProps {
  username: string;
  player: "x" | "o";
}

export type tableElement = "x" | "o" | undefined;

export type boardType = [
  [tableElement, tableElement, tableElement],
  [tableElement, tableElement, tableElement],
  [tableElement, tableElement, tableElement]
]

export type playerProps = {
  username: string,
  points: number
}

export interface gameDataProps {
  playerX: playerProps
  playerO: playerProps
}