import { Suspense } from "react";
import ThreeDots from "../ui/ThreeDots";

const withLoader = ({
	componentToSuspense: LazyComponent,
	containerForLoader,
}: {
	componentToSuspense: React.LazyExoticComponent<React.ComponentType<any>>;
	containerForLoader?: (children: React.ReactNode) => JSX.Element;
}) => {
	return (props: any) => {
		return containerForLoader ? (
			<Suspense fallback={containerForLoader(<ThreeDots />)}>
				<LazyComponent {...props} />
			</Suspense>
		) : (
			<Suspense fallback={<ThreeDots />}>
				<LazyComponent {...props} />
			</Suspense>
		);
	};
};

export default withLoader;
