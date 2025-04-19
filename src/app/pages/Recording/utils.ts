import Konva from 'konva';

export const exportStageToJson = (stage: Konva.Stage | null) => {
  if (!stage) return;

  console.log(stage.toJSON());
};
