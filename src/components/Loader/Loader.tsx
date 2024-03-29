import { LoaderProps } from "@/types";

const Loader = ({ children, loading = true }: LoaderProps) => {
    return loading ? (
        <div className="loader">
            <span className="loader__icon"></span>
        </div>
    ) : (
        children
    );
};

export default Loader;
