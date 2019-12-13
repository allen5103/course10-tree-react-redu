import { connect } from 'react-redux';
import { getDeviceList } from '../actions';
import DeviceList from '../components/DeviceList/main';

export default connect((state) => state, { getDeviceList })(DeviceList);
