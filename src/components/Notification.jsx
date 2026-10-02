const NotificationStyle = {
    fontstyle: 'italic',
    fontSize: 26,
    fontweight: 'bold',
    border: 'solid',
    borderRadius: 25,
    padding: 10,
}

const Notification =({ message, color }) => 
{
    if (message === null) {
    return null}

    const dynaimic={
        ...NotificationStyle,
        color: color
    }

    return (
        <div style={dynaimic}>
            {message}
        </div>
    )
}
export default Notification