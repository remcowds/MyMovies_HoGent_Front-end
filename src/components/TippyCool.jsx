import { motion, useSpring } from 'framer-motion';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import { useCallback, useMemo } from 'react';

let isTouch = false;

if ('ontouchstart' in document.documentElement) {
	isTouch = true;
}

export default function TippyCool({ children, message, isDetail = false }) {
	const springConfig = { damping: 30, stiffness: 250 };
	const initialScale = 0.1;
	const opacity = useSpring(0, springConfig);
	const scale = useSpring(initialScale, springConfig);

	const onMount = useCallback(() => {
		scale.set(1);
		opacity.set(0.6);
	}, [scale, opacity]);

	const onHide = useCallback(
		(instance) => {
			const cleanup = scale.onChange((value) => {
				if (value <= initialScale) {
					cleanup();
					instance.unmount();
				}
			});
			scale.set(initialScale);
			opacity.set(0);
		},
		[scale, opacity]
	);

	const styling = useMemo(() => {
		return {
			background: 'black',
			color: 'white',
			padding: '5px 10px',
			borderRadius: '4px',
			scale,
			opacity,
		};
	}, [scale, opacity]);

	return (
		<Tippy
			placement='right-end'
			followCursor={true}
			plugins={[followCursor]}
			render={() => <motion.p style={styling}>{message}</motion.p>}
			onMount={onMount}
			onHide={onHide}
			disabled={isDetail || isTouch}>
			{children}
		</Tippy>
	);
}
