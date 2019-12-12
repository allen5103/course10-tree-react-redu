import { connect } from 'react-redux';
import { initDevices, fetchPosts } from '../actions';
import DeviceList from '../components/DeviceList/main';

export default connect((state) => state, { initDevices, fetchPosts })(DeviceList);
