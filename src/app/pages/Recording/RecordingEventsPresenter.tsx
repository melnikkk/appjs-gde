import { FC, useRef } from "react";
import { useSelector } from "react-redux";
import Konva from "konva";
import { Recording } from "../../../domain/Recordings";
import { CanvasOverlay } from "./CanvasOverlay";
import { selectCurrentEventIndex } from "../../../infrastructure/store/slices/editor/selectors";

interface Props {
	recording: Recording
}

export const RecordingEventsPresenter: FC<Props> = ({ recording }) => {
	const stageRef = useRef<Konva.Stage>(null);

	const currentEventIndex = useSelector(selectCurrentEventIndex);
	const currentEvent = recording?.events[currentEventIndex];

	if (!currentEvent) {
		return null;
	}

	return <CanvasOverlay
		event={currentEvent}
		width={currentEvent.data.view.innerWidth}
		height={currentEvent.data.view.innerHeight}
		stageRef={stageRef}
	/>
}