'use client';
import { useMyContext } from '../store/myContext';

const Content = () => {
    const { state } = useMyContext();

    return (
        <div className="content">
            <div className="tools">
                <div className="main-tools">{state.toolComponent}</div>
            </div>
            <div className="work-space">
                <div className="work-space-title">
                    <h2>{state.title}</h2>
                </div>
                {state.component}
            </div>
        </div>
    );
};

export default Content;
