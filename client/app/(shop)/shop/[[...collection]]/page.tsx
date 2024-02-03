export default function Shop({ params }: { params: { collection?: string } }) {
    return (
        <div>
            <div>{params.collection ? params.collection[0] : 'all'}</div>
        </div>
    )
}
