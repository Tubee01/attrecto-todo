// date-fns
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider as DatePickerLoalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'moment/locale/hu'

interface Props {
    children: React.ReactNode
}
const LocalizationProvider = ({ children }: Props): JSX.Element => {
    return (
        <DatePickerLoalizationProvider dateAdapter={AdapterMoment}>
            {children}
        </DatePickerLoalizationProvider>
    );
}
export default LocalizationProvider;