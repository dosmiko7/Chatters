import styled from "styled-components";
import { SocialIcon } from "react-social-icons";

const StyledSocial = styled.div`
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		width: 0;
		height: 0;
		transform: translate(-5%, -5%);
		border-radius: var(--border-radius-circle);
		background-color: var(--color-secondary-100);
		transition: var(--transition-all-3);
	}

	&:hover {
		&::before {
			height: 110%;
			width: 110%;
			top: 0;
		}
	}
`;

interface ISocialProps {
	network: string;
	style?: {
		height: number;
		width: number;
	};
	label: string;
	href: string;
}

const Social = ({ network, style, label, href }: ISocialProps) => {
	return (
		<StyledSocial role="link">
			<SocialIcon
				network={network}
				style={style || { height: 40, width: 40 }}
				label={label}
				href={href}
				target="_blank"
			/>
		</StyledSocial>
	);
};

export default Social;
