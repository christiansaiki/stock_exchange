import server from './server';
import helper from './helper';

// Environment Variable
const port = process.env.PORT || 3000;


// listen on the specified port
server.app.listen(port, err => {
	if (err) console.log(err);
	else helper.logger.info(`Server online - Listening to port ${port}`);
});
