pragma solidity >=0.5.0;
import "./ERC20.sol";
// implement the interface
contract XYZCoin is ERC20 {
    // add global variables for the token name and symbol
    string public token_name = "XYZCoin";
    string public token_symbol = "XYZ";
    // set the decimals to 0 and total supply to 1000
    uint8 public token_decimals = 0;
    uint256 public token_totalSupply = 1000;
    // add two global variables for the balances of the owner and the spender
    mapping(address => uint256) public balances; // This is used for the balances of the owner and the spender
    mapping(address => mapping(address => uint256)) public allowed; // This used for the allowed balances of the owner and the spender

    // add a constructor for the token
    constructor() public {
        // set the owner's balance to 1000
        balances[msg.sender] = token_totalSupply;
    }

    // implement the token functions
    function name() public view returns (string memory) {
        return token_name;
    }
    function symbol() public view returns (string memory) {
        return token_symbol;
    }
    function decimals() public view returns (uint8) {
        return token_decimals;
    }
    function totalSupply() public view returns (uint256) {
        return token_totalSupply;
    }
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    // implement the transfer function
    // should throw an error when trying to transfer tokens on behalf of an unauthorized account
    function transfer(address _to, uint256 _value) public returns (bool) {
        // check if the owner has enough balance
        require(_value <= balances[msg.sender], "Insufficient balance");
        // subtract the balance of the owner
        balances[msg.sender] -= _value;
        // add the balance of the spender
        balances[_to] += _value;
        // emit the transfer event
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // implement the transferFrom function
    // should throw an error when trying to transfer tokens on behalf of an unauthorized account
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        // check if the owner has enough balance
        require(_value <= balances[_from], "Insufficient balance");
        // check if the spender has enough balance
        require(_value <= allowed[_from][msg.sender], "Insufficient allowance");
        // subtract the balance of the owner
        balances[_from] -= _value;
        // add the balance of the spender
        balances[_to] += _value;
        // subtract the balance of the spender
        allowed[_from][msg.sender] -= _value;
        // emit the transfer event
        emit Transfer(_from, _to, _value);
        return true;
    }

    // implement the approve function
    function approve(address _spender, uint256 _value) public returns (bool) {
        // add the allowed balance of the spender
        allowed[msg.sender][_spender] += _value;
        // emit the approval event
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // implement the allowance function
    function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
    }
}