import Write from './write';
import List from './list';
import View from './view';

type PageProps = {
    params: {
        args: string;
    }
}

const markerPage = ({ params }: PageProps) => {
    const { args } = params;
    switch (args[0]) {
        case 'write':
            return <Write />;
        case 'list':
            return <List />;
        case 'view':
            return <View id={args[1] as string} />;
        default:
            return <List />;
    }
}
export default markerPage;