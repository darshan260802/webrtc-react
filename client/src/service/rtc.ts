class Peer {
	peer: RTCPeerConnection | null = null;

	constructor() {
		if (!this.peer) {
			this.peer = new RTCPeerConnection({
				iceServers: [
					{
						urls: [
							"stun.l.google.com:19302",
							"stun1.l.google.com:19302",
							"stun2.l.google.com:19302",
							"stun3.l.google.com:19302",
							"stun4.l.google.com:19302",
						],
					},
				],
			});
		}
	}

    createOffer() {
        return this.peer?.createOffer().then((offer) => {
            this.peer?.setLocalDescription(offer);
        });
    }

    createAnswer() {
        return this.peer?.createAnswer().then((answer) => {
            this.peer?.setLocalDescription(answer);
        });
    }

    
}

export default new Peer();

