import React from 'react';
import "./Subscribe.css";
function Subscribe() {
	return (
		<>
			<div className="SubscribeOutWrapper">
				{/* <img src={Ornament} className='OrnamentposSubscribe1' />
				<img src={Ornament} className='OrnamentposSubscribe2' />
				<img src={Ornament} className='OrnamentposSubscribe3' /> */}
				<div className="SubscribeInWrapper">
					<h4>Get access to exclusive updates</h4>

					<form>
						<label>
							<div class="Subscribecontainer">
								<input type="text" placeholder="Your email..." className='subscribetext' />
								<input type="submit" value="subcribe to the newsletter" className='subscibebtn' />
							</div>
						</label>
					</form>
				</div>
			</div>
		</>
	);
}
export default Subscribe;