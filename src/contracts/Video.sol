pragma solidity 0.5.0; 

contract Video {
	address public owner;

	constructor() public {
		owner = msg.sender; 
	}

	struct videoInfo {
		// for ipfs multihash
		bytes32 digest;
		uint8 hashFunction;
		uint8 size;
		uint32 timestamp; 
		uint256 fakeMarks; 
	}

	struct originalLink {
		bytes32 digest; 
		uint256 supportCount; 
	}

	address[] public authors; 
	// mapping (address => videoInfo[]) public videosByauthor; 
	// video author address => array of author's video hashes
	mapping (address => bytes32[]) public authorVideoHashes; 
	mapping (bytes32 => videoInfo) public videosByHash; 

	// multiple links can be marked for each fake video as 'original'
	// support count determines correct link
	mapping(bytes32 => originalLink[]) originalLinks; 

	// each user marks whether videos are deepfakes or not.
	// address maps to video hash, which maps to bool that 
	// tells whether it's been marked or not
	mapping (address => mapping(bytes32 => bool)) userMarkedVideos; 

	// TODO: be able to sort deepfake lists

	// FIXME: how do we make this cheaper?
	function setVideoData(
		address _address, 
		bytes32 _digest, 
		uint8 _hashFunction, 
		uint8 _size
	) public {
		// FIXME: does this require make sense?
		// Is it necessary?
		require(msg.sender == _address);
		videoInfo memory currentVideo; 
		// currentVideo.author = _address; 
		currentVideo.digest = _digest; 
		currentVideo.hashFunction = _hashFunction; 
		currentVideo.size = _size; 
		currentVideo.timestamp = uint32(now); 
		currentVideo.fakeMarks = 0; 

		// if new author
		if (authorVideoHashes[_address].length == 0) {
			authors.push(_address); 
		}
		// FIXME: refactor to remove need for duplicate 
		// mapping and save costs. create mapping where
		// author address => array of video hashes
		// videosByauthor[_address].push(currentVideo);
		authorVideoHashes[_address].push(_digest); 
		videosByHash[_digest] = currentVideo; 
	}

	function findOriginalLinkIndex(bytes32 _fakeDigest, bytes32 _originalDigest) public view returns (uint256) {
		uint256 i; 
		uint256 len = originalLinks[_fakeDigest].length;
		for (i = 0; i < len; i++) {
			if (originalLinks[_fakeDigest][i].digest == _originalDigest)
				return i; 
		}
		return uint256(-1); 
	}

	function markAsDeepfake(bytes32 _fakeDigest, bytes32 _originalDigest) public {
		// require(_fakeTimestamp > _originalTimestamp, "Fake videos must have a greater timestamp than original"); 
		require(userMarkedVideos[msg.sender][_fakeDigest] == false, "User has already marked this video as a fake"); 
		uint256 index = findOriginalLinkIndex(_fakeDigest, _originalDigest); 
		if (index != uint256(-1)) {
			// find matching originalLink and update count
			originalLinks[_fakeDigest][index].supportCount += 1; 
		} else {
			// new original Link
			originalLink memory link; 
			link.digest = _originalDigest; 
			link.supportCount = 1; 
			originalLinks[_fakeDigest].push(link);
		}
		videosByHash[_fakeDigest].fakeMarks += 1; 
		userMarkedVideos[msg.sender][_fakeDigest] = true; 
	}

	function getAuthorCount() public view returns (uint256) {
		return authors.length; 
	}

	function getAuthors() public view returns (address[] memory) {
		return authors; 
	}

	function getVideoCount() public view returns (uint256) {
		uint i = 0; 
		uint len = authors.length; 
		uint count = 0; 
		for (i = 0; i < len; i++) {
			count += authorVideoHashes[authors[i]].length; 
		}
		return count; 
	}

	// must get video count and iterate because solidity doesn't allow for 
	// returning of arrays of structs
	function getAuthorVideoCount(address _address) public view returns (uint256) {
		return authorVideoHashes[_address].length; 
	}

	function getAuthorVideoData(address _address, uint256 _index) public view returns (bytes32, uint8, uint8, uint32, uint256) {
		bytes32 digest = authorVideoHashes[_address][_index]; 
		return (
			digest, 
			videosByHash[digest].hashFunction, 
			videosByHash[digest].size, 
			videosByHash[digest].timestamp, 
			videosByHash[digest].fakeMarks
		); 
	}

	function getVideoByHash(bytes32 _digest) public view returns (uint8, uint8, uint32, uint256) {
		return(
			videosByHash[_digest].hashFunction, 
			videosByHash[_digest].size, 
			videosByHash[_digest].timestamp, 
			videosByHash[_digest].fakeMarks
		); 
	}

	function getOriginalLinksCount(bytes32 _fakeDigest) public view returns (uint256) {
		return originalLinks[_fakeDigest].length; 
	}

	function getOriginalLinks(bytes32 _fakeDigest, uint256 _index) public view returns (bytes32, uint256) {
		return (
			originalLinks[_fakeDigest][_index].digest, 
			originalLinks[_fakeDigest][_index].supportCount
		); 
	}
}