// needed for Safari <14; see: https://github.com/leeoniya/uPlot/issues/538
if (window.matchMedia("").addEventListener == null) {
	let matchMedia_old = window.matchMedia;
	window.matchMedia = (query) => {
		let mql = matchMedia_old(query);
		if (!mql.addEventListener) {
			mql.addEventListener = (evName, handler)=>{
				mql.addListener(handler);
			};
			mql.removeEventListener = (evName, handler)=>{
				mql.removeListener(handler);
			};
		}
		return mql;
	};
}