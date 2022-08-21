import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const PageLoading = () => {
    return (
        <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            invisible={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
export default PageLoading 