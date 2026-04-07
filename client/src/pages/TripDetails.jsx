import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import DestinationCard from '../components/DestinationCard';
import ActivityBtn from '../components/ActivityBtn';

const TripDetails = ({ data }) => {
    const { id } = useParams();
    const [activities, setActivities] = useState([]);
    const [destinations, setDestinations] = useState([]);

    const trip = data && data.find(t => t.id === parseInt(id));

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('/api/activities/' + id);
            const data = await response.json();
            setActivities(data);
        }

        const fetchDestinations = async () => {
            const response = await fetch('/api/trips-destinations/destinations/' + id);
            const data = await response.json();
            setDestinations(data);
        }

        fetchActivities();
        fetchDestinations();
    }, [id]);

    return (
        <div>
            {trip && (
                <div>
                    <h2>{trip.title}</h2>
                    <p>{trip.description}</p>
                </div>
            )}
            <Link to={'/activity/create/' + id}><button>+ Add Activity</button></Link>
            <Link to={'/destination/new/' + id}><button>+ Add Destination</button></Link>
            <h3>Activities</h3>
            <div>
                {activities && activities.length > 0
                    ? activities.map(activity =>
                        <ActivityBtn key={activity.id} id={activity.id} activity={activity.activity} num_votes={activity.num_votes} />
                    )
                    : <p>No activities yet</p>
                }
            </div>
            <h3>Destinations</h3>
            <div>
                {destinations && destinations.length > 0
                    ? destinations.map(destination =>
                        <DestinationCard key={destination.id} id={destination.id} destination={destination.destination} description={destination.description} img_url={destination.img_url} flag_img_url={destination.flag_img_url} />
                    )
                    : <p>No destinations yet</p>
                }
            </div>
        </div>
    );
};

export default TripDetails;
