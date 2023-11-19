const MAGIC = "\u{9ed1}\u{6697}\u{4e4b}\u{73af}";
const PLACEHOLDER = "\u{829d}\u{987f} \u{5e9e}\u{987f} \u{628a}\u{9ed1}\u{6697}\u{7684}\u{529b}\u{91cf}\u{501f}\u{7ed9}\u{6211}\u{5427}"
const STORAGE_KEY = 'darkring';

const DEFAULT_KDF_PARAMS = {
    PBKDF2: {
        name: "PBKDF2",
        iterations: 10000000,
        hash: "SHA-256",
    },
    scrypt: {
        name: "scrypt",
        N: 18,
        r: 8,
        p: 5,
    },
    Argon2: {
        name: "Argon2",
        m: 40960,
        t: 5,
        p: 1,
    },
};

const KDF_ALGS = ['PBKDF2', 'scrypt', 'Argon2'];
const DEFAULT_KDF_ALG = KDF_ALGS[0];

const DEFAULT_TOTP_PARAMS = {
    OATH: {
        name: "OATH",
        digits: 6,
        hash: "SHA-1",
        step: 30,
        start: 0,
    }
};

const TOTP_ALGS = ['OATH'];
const DEFAULT_TOTP_ALG = TOTP_ALGS[0];

const DEFAULT_KEY_PARAMS = {
    base32: {
        code: 'base32',
        value: '',
    },
    hex: {
        code: 'hex',
        value: '',
    },
};

const KEY_ENCODINGS = ['base32', 'hex'];
const DEFAULT_KEY_ENCODING = KEY_ENCODINGS[0];

const DEFAULT_CHARS_PARAMS = {
    base95: {
        code: 'base95',
        disallow: '',
        length: 20,
    },
    3500: {
        code: '3500',
        length: 11,
    },
    cjk: {
        code: 'cjk',
        length: 9,
    },
};

const CHARS_ENCODINGS = [
    {label: 'base95',
     value: 'base95'},
    {label: '3500\u{5e38}\u{7528}\u{5b57}',
     value:'3500'},
    {label: '\u{7edf}\u{4e00}\u{8868}\u{610f}\u{6587}\u{5b57}(\u{4e0d}\u{542b}\u{6269}\u{5c55})',
     value: 'cjk'},
];
const DEFAULT_CHARS_ENCODING = CHARS_ENCODINGS[0].value;

const DEFAULT_PROFILE = {
    totp: {
        key: DEFAULT_KEY_PARAMS[DEFAULT_KEY_ENCODING],
        alg: DEFAULT_TOTP_PARAMS[DEFAULT_TOTP_ALG],
    },
    site: '',
    account: '',
    bak: '',
    kdf: {
        salt: '',
        chars: DEFAULT_CHARS_PARAMS[DEFAULT_CHARS_ENCODING],
        alg: DEFAULT_KDF_PARAMS[DEFAULT_KDF_ALG],
    }
};


const HEX_CHARS = "0123456789ABCDEF";
const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const HEX_PATTERN = `[${HEX_CHARS}]+`;
const BASE32_PATTERN = `[${BASE32_CHARS}]+`;

const BASE95_CHARS = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const COMMON3500_CHARS = '\u{4e00}\u{4e59}\u{4e8c}\u{5341}\u{4e01}\u{5382}\u{4e03}\u{535c}\u{516b}\u{4eba}\u{5165}\u{513f}\u{5315}\u{51e0}\u{4e5d}\u{5201}\u{4e86}\u{5200}\u{529b}\u{4e43}\u{53c8}\u{4e09}\u{5e72}\u{4e8e}\u{4e8f}\u{5de5}\u{571f}\u{58eb}\u{624d}\u{4e0b}\u{5bf8}\u{5927}\u{4e08}\u{4e0e}\u{4e07}\u{4e0a}\u{5c0f}\u{53e3}\u{5c71}\u{5dfe}\u{5343}\u{4e5e}\u{5ddd}\u{4ebf}\u{4e2a}\u{5915}\u{4e45}\u{4e48}\u{52fa}\u{51e1}\u{4e38}\u{53ca}\u{5e7f}\u{4ea1}\u{95e8}\u{4e2b}\u{4e49}\u{4e4b}\u{5c38}\u{5df1}\u{5df2}\u{5df3}\u{5f13}\u{5b50}\u{536b}\u{4e5f}\u{5973}\u{5203}\u{98de}\u{4e60}\u{53c9}\u{9a6c}\u{4e61}\u{4e30}\u{738b}\u{5f00}\u{4e95}\u{5929}\u{592b}\u{5143}\u{65e0}\u{4e91}\u{4e13}\u{4e10}\u{624e}\u{827a}\u{6728}\u{4e94}\u{652f}\u{5385}\u{4e0d}\u{72ac}\u{592a}\u{533a}\u{5386}\u{6b79}\u{53cb}\u{5c24}\u{5339}\u{8f66}\u{5de8}\u{7259}\u{5c6f}\u{6208}\u{6bd4}\u{4e92}\u{5207}\u{74e6}\u{6b62}\u{5c11}\u{66f0}\u{65e5}\u{4e2d}\u{8d1d}\u{5188}\u{5185}\u{6c34}\u{89c1}\u{5348}\u{725b}\u{624b}\u{6c14}\u{6bdb}\u{58ec}\u{5347}\u{592d}\u{957f}\u{4ec1}\u{4ec0}\u{7247}\u{4ec6}\u{5316}\u{4ec7}\u{5e01}\u{4ecd}\u{4ec5}\u{65a4}\u{722a}\u{53cd}\u{4ecb}\u{7236}\u{4ece}\u{4ed1}\u{4eca}\u{51f6}\u{5206}\u{4e4f}\u{516c}\u{4ed3}\u{6708}\u{6c0f}\u{52ff}\u{6b20}\u{98ce}\u{4e39}\u{5300}\u{4e4c}\u{52fe}\u{51e4}\u{516d}\u{6587}\u{4ea2}\u{65b9}\u{706b}\u{4e3a}\u{6597}\u{5fc6}\u{8ba1}\u{8ba2}\u{6237}\u{8ba4}\u{5197}\u{8ba5}\u{5fc3}\u{5c3a}\u{5f15}\u{4e11}\u{5df4}\u{5b54}\u{961f}\u{529e}\u{4ee5}\u{5141}\u{4e88}\u{9093}\u{529d}\u{53cc}\u{4e66}\u{5e7b}\u{7389}\u{520a}\u{672a}\u{672b}\u{793a}\u{51fb}\u{6253}\u{5de7}\u{6b63}\u{6251}\u{5349}\u{6252}\u{529f}\u{6254}\u{53bb}\u{7518}\u{4e16}\u{827e}\u{53e4}\u{8282}\u{672c}\u{672f}\u{53ef}\u{4e19}\u{5de6}\u{5389}\u{77f3}\u{53f3}\u{5e03}\u{592f}\u{620a}\u{9f99}\u{5e73}\u{706d}\u{8f67}\u{4e1c}\u{5361}\u{5317}\u{5360}\u{51f8}\u{5362}\u{4e1a}\u{65e7}\u{5e05}\u{5f52}\u{65e6}\u{76ee}\u{4e14}\u{53f6}\u{7532}\u{7533}\u{53ee}\u{7535}\u{53f7}\u{7530}\u{7531}\u{53ea}\u{53ed}\u{53f2}\u{592e}\u{5144}\u{53fd}\u{53fc}\u{53eb}\u{53e9}\u{53e8}\u{53e6}\u{53f9}\u{5189}\u{76bf}\u{51f9}\u{56da}\u{56db}\u{751f}\u{77e2}\u{5931}\u{4e4d}\u{79be}\u{4e18}\u{4ed8}\u{4ed7}\u{4ee3}\u{4ed9}\u{4eec}\u{4eea}\u{767d}\u{4ed4}\u{4ed6}\u{65a5}\u{74dc}\u{4e4e}\u{4e1b}\u{4ee4}\u{7528}\u{7529}\u{5370}\u{5c14}\u{4e50}\u{53e5}\u{5306}\u{518c}\u{536f}\u{72af}\u{5916}\u{5904}\u{51ac}\u{9e1f}\u{52a1}\u{5305}\u{9965}\u{4e3b}\u{5e02}\u{7acb}\u{51af}\u{7384}\u{95ea}\u{5170}\u{534a}\u{6c41}\u{6c47}\u{5934}\u{6c49}\u{5b81}\u{7a74}\u{5b83}\u{8ba8}\u{5199}\u{8ba9}\u{793c}\u{8bad}\u{8bae}\u{5fc5}\u{8baf}\u{8bb0}\u{6c38}\u{53f8}\u{5c3c}\u{6c11}\u{5f17}\u{5f18}\u{51fa}\u{8fbd}\u{5976}\u{5974}\u{53ec}\u{52a0}\u{76ae}\u{8fb9}\u{5b55}\u{53d1}\u{5723}\u{5bf9}\u{53f0}\u{77db}\u{7ea0}\u{6bcd}\u{5e7c}\u{4e1d}\u{90a6}\u{5f0f}\u{8fc2}\u{5211}\u{620e}\u{52a8}\u{625b}\u{5bfa}\u{5409}\u{6263}\u{8003}\u{6258}\u{8001}\u{5de9}\u{573e}\u{6267}\u{6269}\u{626b}\u{5730}\u{573a}\u{626c}\u{8033}\u{828b}\u{5171}\u{8292}\u{4e9a}\u{829d}\u{673d}\u{6734}\u{673a}\u{6743}\u{8fc7}\u{81e3}\u{540f}\u{518d}\u{534f}\u{897f}\u{538b}\u{538c}\u{620c}\u{5728}\u{767e}\u{6709}\u{5b58}\u{800c}\u{9875}\u{5320}\u{5938}\u{593a}\u{7070}\u{8fbe}\u{5217}\u{6b7b}\u{6210}\u{5939}\u{5937}\u{8f68}\u{90aa}\u{5c27}\u{5212}\u{8fc8}\u{6bd5}\u{81f3}\u{6b64}\u{8d1e}\u{5e08}\u{5c18}\u{5c16}\u{52a3}\u{5149}\u{5f53}\u{65e9}\u{5401}\u{5410}\u{5413}\u{866b}\u{66f2}\u{56e2}\u{5415}\u{540c}\u{540a}\u{5403}\u{56e0}\u{5438}\u{5417}\u{5406}\u{5c7f}\u{5c79}\u{5c81}\u{5e06}\u{56de}\u{5c82}\u{5219}\u{521a}\u{7f51}\u{8089}\u{5e74}\u{6731}\u{5148}\u{4e22}\u{5ef7}\u{820c}\u{7af9}\u{8fc1}\u{4e54}\u{8fc4}\u{4f1f}\u{4f20}\u{4e52}\u{4e53}\u{4f11}\u{4f0d}\u{4f0f}\u{4f18}\u{81fc}\u{4f10}\u{5ef6}\u{4ef2}\u{4ef6}\u{4efb}\u{4f24}\u{4ef7}\u{4f26}\u{4efd}\u{534e}\u{4ef0}\u{4eff}\u{4f19}\u{4f2a}\u{81ea}\u{4f0a}\u{8840}\u{5411}\u{4f3c}\u{540e}\u{884c}\u{821f}\u{5168}\u{4f1a}\u{6740}\u{5408}\u{5146}\u{4f01}\u{4f17}\u{7237}\u{4f1e}\u{521b}\u{808c}\u{808b}\u{6735}\u{6742}\u{5371}\u{65ec}\u{65e8}\u{65ed}\u{8d1f}\u{5308}\u{540d}\u{5404}\u{591a}\u{4e89}\u{8272}\u{58ee}\u{51b2}\u{5986}\u{51b0}\u{5e84}\u{5e86}\u{4ea6}\u{5218}\u{9f50}\u{4ea4}\u{8863}\u{6b21}\u{4ea7}\u{51b3}\u{4ea5}\u{5145}\u{5984}\u{95ed}\u{95ee}\u{95ef}\u{7f8a}\u{5e76}\u{5173}\u{7c73}\u{706f}\u{5dde}\u{6c57}\u{6c61}\u{6c5f}\u{6c5b}\u{6c60}\u{6c5d}\u{6c64}\u{5fd9}\u{5174}\u{5b87}\u{5b88}\u{5b85}\u{5b57}\u{5b89}\u{8bb2}\u{8bb3}\u{519b}\u{8bb6}\u{8bb8}\u{8bb9}\u{8bba}\u{8bbc}\u{519c}\u{8bbd}\u{8bbe}\u{8bbf}\u{8bc0}\u{5bfb}\u{90a3}\u{8fc5}\u{5c3d}\u{5bfc}\u{5f02}\u{5f1b}\u{5b59}\u{9635}\u{9633}\u{6536}\u{9636}\u{9634}\u{9632}\u{5978}\u{5982}\u{5987}\u{5983}\u{597d}\u{5979}\u{5988}\u{620f}\u{7fbd}\u{89c2}\u{6b22}\u{4e70}\u{7ea2}\u{9a6e}\u{7ea4}\u{9a6f}\u{7ea6}\u{7ea7}\u{7eaa}\u{9a70}\u{7eab}\u{5de1}\u{5bff}\u{5f04}\u{9ea6}\u{7396}\u{739b}\u{5f62}\u{8fdb}\u{6212}\u{541e}\u{8fdc}\u{8fdd}\u{97e7}\u{8fd0}\u{6276}\u{629a}\u{575b}\u{6280}\u{574f}\u{62a0}\u{6270}\u{627c}\u{62d2}\u{627e}\u{6279}\u{5740}\u{626f}\u{8d70}\u{6284}\u{8d21}\u{6c5e}\u{575d}\u{653b}\u{8d64}\u{6298}\u{6293}\u{6273}\u{62a1}\u{626e}\u{62a2}\u{5b5d}\u{574e}\u{5747}\u{6291}\u{629b}\u{6295}\u{575f}\u{5751}\u{6297}\u{574a}\u{6296}\u{62a4}\u{58f3}\u{5fd7}\u{5757}\u{626d}\u{58f0}\u{628a}\u{62a5}\u{62df}\u{5374}\u{6292}\u{52ab}\u{8299}\u{829c}\u{82c7}\u{82bd}\u{82b1}\u{82b9}\u{82a5}\u{82ac}\u{82cd}\u{82b3}\u{4e25}\u{82a6}\u{82af}\u{52b3}\u{514b}\u{82ad}\u{82cf}\u{6746}\u{6760}\u{675c}\u{6750}\u{6751}\u{6756}\u{674f}\u{6749}\u{5deb}\u{6781}\u{674e}\u{6768}\u{6c42}\u{752b}\u{5323}\u{66f4}\u{675f}\u{543e}\u{8c46}\u{4e24}\u{9149}\u{4e3d}\u{533b}\u{8fb0}\u{52b1}\u{5426}\u{8fd8}\u{5c2c}\u{6b7c}\u{6765}\u{8fde}\u{8f69}\u{6b65}\u{5364}\u{575a}\u{8096}\u{65f1}\u{76ef}\u{5448}\u{65f6}\u{5434}\u{52a9}\u{53bf}\u{91cc}\u{5446}\u{5431}\u{5420}\u{5455}\u{56ed}\u{65f7}\u{56f4}\u{5440}\u{5428}\u{8db3}\u{90ae}\u{7537}\u{56f0}\u{5435}\u{4e32}\u{5458}\u{5450}\u{542c}\u{541f}\u{5429}\u{545b}\u{543b}\u{5439}\u{545c}\u{542d}\u{5427}\u{9091}\u{543c}\u{56e4}\u{522b}\u{542e}\u{5c96}\u{5c97}\u{5e10}\u{8d22}\u{9488}\u{9489}\u{7261}\u{544a}\u{6211}\u{4e71}\u{5229}\u{79c3}\u{79c0}\u{79c1}\u{6bcf}\u{5175}\u{4f30}\u{4f53}\u{4f55}\u{4f50}\u{4f51}\u{4f46}\u{4f38}\u{4f43}\u{4f5c}\u{4f2f}\u{4f36}\u{4f63}\u{4f4e}\u{4f60}\u{4f4f}\u{4f4d}\u{4f34}\u{8eab}\u{7682}\u{4f3a}\u{4f5b}\u{56f1}\u{8fd1}\u{5f7b}\u{5f79}\u{8fd4}\u{4f59}\u{5e0c}\u{5750}\u{8c37}\u{59a5}\u{542b}\u{90bb}\u{5c94}\u{809d}\u{809b}\u{809a}\u{8098}\u{80a0}\u{9f9f}\u{7538}\u{514d}\u{72c2}\u{72b9}\u{72c8}\u{89d2}\u{5220}\u{6761}\u{5f64}\u{5375}\u{7078}\u{5c9b}\u{5228}\u{8fce}\u{996d}\u{996e}\u{7cfb}\u{8a00}\u{51bb}\u{72b6}\u{4ea9}\u{51b5}\u{5e8a}\u{5e93}\u{5e87}\u{7597}\u{541d}\u{5e94}\u{8fd9}\u{51b7}\u{5e90}\u{5e8f}\u{8f9b}\u{5f03}\u{51b6}\u{5fd8}\u{95f0}\u{95f2}\u{95f4}\u{95f7}\u{5224}\u{5151}\u{7076}\u{707f}\u{707c}\u{5f1f}\u{6c6a}\u{6c90}\u{6c9b}\u{6c70}\u{6ca5}\u{6c99}\u{6c7d}\u{6c83}\u{6ca6}\u{6c79}\u{6cdb}\u{6ca7}\u{6ca1}\u{6c9f}\u{6caa}\u{6c88}\u{6c89}\u{6c81}\u{6000}\u{5fe7}\u{5ff1}\u{5feb}\u{5b8c}\u{5b8b}\u{5b8f}\u{7262}\u{7a76}\u{7a77}\u{707e}\u{826f}\u{8bc1}\u{542f}\u{8bc4}\u{8865}\u{521d}\u{793e}\u{7940}\u{8bc6}\u{8bc8}\u{8bc9}\u{7f55}\u{8bca}\u{8bcd}\u{8bd1}\u{541b}\u{7075}\u{5373}\u{5c42}\u{5c41}\u{5c3f}\u{5c3e}\u{8fdf}\u{5c40}\u{6539}\u{5f20}\u{5fcc}\u{9645}\u{9646}\u{963f}\u{9648}\u{963b}\u{9644}\u{5760}\u{5993}\u{5999}\u{5996}\u{59ca}\u{59a8}\u{5992}\u{52aa}\u{5fcd}\u{52b2}\u{77e3}\u{9e21}\u{7eac}\u{9a71}\u{7eaf}\u{7eb1}\u{7eb2}\u{7eb3}\u{9a73}\u{7eb5}\u{7eb7}\u{7eb8}\u{7eb9}\u{7eba}\u{9a74}\u{7ebd}\u{5949}\u{73a9}\u{73af}\u{6b66}\u{9752}\u{8d23}\u{73b0}\u{73ab}\u{8868}\u{89c4}\u{62b9}\u{5366}\u{5777}\u{576f}\u{62d3}\u{62e2}\u{62d4}\u{576a}\u{62e3}\u{5766}\u{62c5}\u{5764}\u{62bc}\u{62bd}\u{62d0}\u{62d6}\u{8005}\u{62cd}\u{9876}\u{62c6}\u{62ce}\u{62e5}\u{62b5}\u{62d8}\u{52bf}\u{62b1}\u{62c4}\u{5783}\u{62c9}\u{62e6}\u{5e78}\u{62cc}\u{62e7}\u{62c2}\u{62d9}\u{62db}\u{5761}\u{62ab}\u{62e8}\u{62e9}\u{62ac}\u{62c7}\u{62d7}\u{5176}\u{53d6}\u{8309}\u{82e6}\u{6614}\u{82db}\u{82e5}\u{8302}\u{82f9}\u{82d7}\u{82f1}\u{82df}\u{82d1}\u{82de}\u{8303}\u{76f4}\u{8301}\u{8304}\u{830e}\u{82d4}\u{8305}\u{6789}\u{6797}\u{679d}\u{676f}\u{67a2}\u{67dc}\u{679a}\u{6790}\u{677f}\u{677e}\u{67aa}\u{67ab}\u{6784}\u{676d}\u{6770}\u{8ff0}\u{6795}\u{4e27}\u{6216}\u{753b}\u{5367}\u{4e8b}\u{523a}\u{67a3}\u{96e8}\u{5356}\u{90c1}\u{77fe}\u{77ff}\u{7801}\u{5395}\u{5948}\u{5954}\u{5947}\u{594b}\u{6001}\u{6b27}\u{6bb4}\u{5784}\u{59bb}\u{8f70}\u{9877}\u{8f6c}\u{65a9}\u{8f6e}\u{8f6f}\u{5230}\u{975e}\u{53d4}\u{6b67}\u{80af}\u{9f7f}\u{4e9b}\u{5353}\u{864e}\u{864f}\u{80be}\u{8d24}\u{5c1a}\u{65fa}\u{5177}\u{5473}\u{679c}\u{6606}\u{56fd}\u{54ce}\u{5495}\u{660c}\u{5475}\u{7545}\u{660e}\u{6613}\u{5499}\u{6602}\u{8fea}\u{5178}\u{56fa}\u{5fe0}\u{547b}\u{5492}\u{548b}\u{5490}\u{547c}\u{9e23}\u{548f}\u{5462}\u{5484}\u{5496}\u{5cb8}\u{5ca9}\u{5e16}\u{7f57}\u{5e1c}\u{5e15}\u{5cad}\u{51ef}\u{8d25}\u{8d26}\u{8d29}\u{8d2c}\u{8d2d}\u{8d2e}\u{56fe}\u{9493}\u{5236}\u{77e5}\u{8fed}\u{6c1b}\u{5782}\u{7267}\u{7269}\u{4e56}\u{522e}\u{79c6}\u{548c}\u{5b63}\u{59d4}\u{79c9}\u{4f73}\u{4f8d}\u{5cb3}\u{4f9b}\u{4f7f}\u{4f8b}\u{4fa0}\u{4fa5}\u{7248}\u{4f84}\u{4fa6}\u{4fa3}\u{4fa7}\u{51ed}\u{4fa8}\u{4f69}\u{8d27}\u{4f88}\u{4f9d}\u{5351}\u{7684}\u{8feb}\u{8d28}\u{6b23}\u{5f81}\u{5f80}\u{722c}\u{5f7c}\u{5f84}\u{6240}\u{820d}\u{91d1}\u{5239}\u{547d}\u{80b4}\u{65a7}\u{7238}\u{91c7}\u{89c5}\u{53d7}\u{4e73}\u{8d2a}\u{5ff5}\u{8d2b}\u{5fff}\u{80a4}\u{80ba}\u{80a2}\u{80bf}\u{80c0}\u{670b}\u{80a1}\u{80ae}\u{80aa}\u{80a5}\u{670d}\u{80c1}\u{5468}\u{660f}\u{9c7c}\u{5154}\u{72d0}\u{5ffd}\u{72d7}\u{72de}\u{5907}\u{9970}\u{9971}\u{9972}\u{53d8}\u{4eac}\u{4eab}\u{5e9e}\u{5e97}\u{591c}\u{5e99}\u{5e9c}\u{5e95}\u{759f}\u{7599}\u{759a}\u{5242}\u{5352}\u{90ca}\u{5e9a}\u{5e9f}\u{51c0}\u{76f2}\u{653e}\u{523b}\u{80b2}\u{6c13}\u{95f8}\u{95f9}\u{90d1}\u{5238}\u{5377}\u{5355}\u{70ac}\u{7092}\u{708a}\u{7095}\u{708e}\u{7089}\u{6cab}\u{6d45}\u{6cd5}\u{6cc4}\u{6cbd}\u{6cb3}\u{6cbe}\u{6cea}\u{6cae}\u{6cb9}\u{6cca}\u{6cbf}\u{6ce1}\u{6ce8}\u{6ce3}\u{6cde}\u{6cfb}\u{6ccc}\u{6cf3}\u{6ce5}\u{6cb8}\u{6cbc}\u{6ce2}\u{6cfc}\u{6cfd}\u{6cbb}\u{6014}\u{602f}\u{6016}\u{6027}\u{6015}\u{601c}\u{602a}\u{6021}\u{5b66}\u{5b9d}\u{5b97}\u{5b9a}\u{5ba0}\u{5b9c}\u{5ba1}\u{5b99}\u{5b98}\u{7a7a}\u{5e18}\u{5b9b}\u{5b9e}\u{8bd5}\u{90ce}\u{8bd7}\u{80a9}\u{623f}\u{8bda}\u{886c}\u{886b}\u{89c6}\u{7948}\u{8bdd}\u{8bde}\u{8be1}\u{8be2}\u{8be5}\u{8be6}\u{5efa}\u{8083}\u{5f55}\u{96b6}\u{5e1a}\u{5c49}\u{5c45}\u{5c4a}\u{5237}\u{5c48}\u{5f27}\u{5f25}\u{5f26}\u{627f}\u{5b5f}\u{964b}\u{964c}\u{5b64}\u{9655}\u{964d}\u{51fd}\u{9650}\u{59b9}\u{59d1}\u{59d0}\u{59d3}\u{59ae}\u{59cb}\u{59c6}\u{8fe2}\u{9a7e}\u{53c1}\u{53c2}\u{8270}\u{7ebf}\u{7ec3}\u{7ec4}\u{7ec5}\u{7ec6}\u{9a76}\u{7ec7}\u{9a79}\u{7ec8}\u{9a7b}\u{7eca}\u{9a7c}\u{7ecd}\u{7ece}\u{7ecf}\u{8d2f}\u{5951}\u{8d30}\u{594f}\u{6625}\u{5e2e}\u{73b7}\u{73cd}\u{73b2}\u{73ca}\u{73bb}\u{6bd2}\u{578b}\u{62ed}\u{6302}\u{5c01}\u{6301}\u{62f7}\u{62f1}\u{9879}\u{57ae}\u{630e}\u{57ce}\u{631f}\u{6320}\u{653f}\u{8d74}\u{8d75}\u{6321}\u{62fd}\u{54c9}\u{633a}\u{62ec}\u{57a2}\u{62f4}\u{62fe}\u{6311}\u{579b}\u{6307}\u{57ab}\u{6323}\u{6324}\u{62fc}\u{6316}\u{6309}\u{6325}\u{632a}\u{62ef}\u{67d0}\u{751a}\u{8346}\u{8338}\u{9769}\u{832c}\u{8350}\u{5df7}\u{5e26}\u{8349}\u{8327}\u{8335}\u{8336}\u{8352}\u{832b}\u{8361}\u{8363}\u{8364}\u{8367}\u{6545}\u{80e1}\u{836b}\u{8354}\u{5357}\u{836f}\u{6807}\u{6808}\u{67d1}\u{67af}\u{67c4}\u{680b}\u{76f8}\u{67e5}\u{67cf}\u{6805}\u{67f3}\u{67f1}\u{67ff}\u{680f}\u{67e0}\u{6811}\u{52c3}\u{8981}\u{67ec}\u{54b8}\u{5a01}\u{6b6a}\u{7814}\u{7816}\u{5398}\u{539a}\u{780c}\u{7802}\u{6cf5}\u{781a}\u{780d}\u{9762}\u{8010}\u{800d}\u{7275}\u{9e25}\u{6b8b}\u{6b83}\u{8f74}\u{8f7b}\u{9e26}\u{7686}\u{97ed}\u{80cc}\u{6218}\u{70b9}\u{8650}\u{4e34}\u{89c8}\u{7ad6}\u{7701}\u{524a}\u{5c1d}\u{6627}\u{76f9}\u{662f}\u{76fc}\u{7728}\u{54c7}\u{54c4}\u{54d1}\u{663e}\u{5192}\u{6620}\u{661f}\u{6628}\u{54a7}\u{662d}\u{754f}\u{8db4}\u{80c3}\u{8d35}\u{754c}\u{8679}\u{867e}\u{8681}\u{601d}\u{8682}\u{867d}\u{54c1}\u{54bd}\u{9a82}\u{52cb}\u{54d7}\u{54b1}\u{54cd}\u{54c8}\u{54c6}\u{54ac}\u{54b3}\u{54aa}\u{54ea}\u{54df}\u{70ad}\u{5ce1}\u{7f5a}\u{8d31}\u{8d34}\u{8d3b}\u{9aa8}\u{5e7d}\u{9499}\u{949d}\u{949e}\u{949f}\u{94a2}\u{94a0}\u{94a5}\u{94a6}\u{94a7}\u{94a9}\u{94ae}\u{5378}\u{7f38}\u{62dc}\u{770b}\u{77e9}\u{6be1}\u{6c22}\u{600e}\u{7272}\u{9009}\u{9002}\u{79d2}\u{9999}\u{79cd}\u{79cb}\u{79d1}\u{91cd}\u{590d}\u{7aff}\u{6bb5}\u{4fbf}\u{4fe9}\u{8d37}\u{987a}\u{4fee}\u{4fcf}\u{4fdd}\u{4fc3}\u{4fc4}\u{4fd0}\u{4fae}\u{4fed}\u{4fd7}\u{4fd8}\u{4fe1}\u{7687}\u{6cc9}\u{9b3c}\u{4fb5}\u{79b9}\u{4faf}\u{8ffd}\u{4fca}\u{76fe}\u{5f85}\u{5f8a}\u{884d}\u{5f8b}\u{5f88}\u{987b}\u{53d9}\u{5251}\u{9003}\u{98df}\u{76c6}\u{80da}\u{80e7}\u{80c6}\u{80dc}\u{80de}\u{80d6}\u{8109}\u{80ce}\u{52c9}\u{72ed}\u{72ee}\u{72ec}\u{72f0}\u{72e1}\u{72f1}\u{72e0}\u{8d38}\u{6028}\u{6025}\u{9975}\u{9976}\u{8680}\u{997a}\u{997c}\u{5ce6}\u{5f2f}\u{5c06}\u{5956}\u{54c0}\u{4ead}\u{4eae}\u{5ea6}\u{8ff9}\u{5ead}\u{75ae}\u{75af}\u{75ab}\u{75a4}\u{54a8}\u{59ff}\u{4eb2}\u{97f3}\u{5e1d}\u{65bd}\u{95fa}\u{95fb}\u{95fd}\u{9600}\u{9601}\u{5dee}\u{517b}\u{7f8e}\u{59dc}\u{53db}\u{9001}\u{7c7b}\u{8ff7}\u{7c7d}\u{5a04}\u{524d}\u{9996}\u{9006}\u{5179}\u{603b}\u{70bc}\u{70b8}\u{70c1}\u{70ae}\u{70ab}\u{70c2}\u{5243}\u{6d3c}\u{6d01}\u{6d2a}\u{6d12}\u{67d2}\u{6d47}\u{6d4a}\u{6d1e}\u{6d4b}\u{6d17}\u{6d3b}\u{6d3e}\u{6d3d}\u{67d3}\u{6d1b}\u{6d4f}\u{6d4e}\u{6d0b}\u{6d32}\u{6d51}\u{6d53}\u{6d25}\u{6043}\u{6052}\u{6062}\u{604d}\u{606c}\u{6064}\u{6070}\u{607c}\u{6068}\u{4e3e}\u{89c9}\u{5ba3}\u{5ba6}\u{5ba4}\u{5bab}\u{5baa}\u{7a81}\u{7a7f}\u{7a83}\u{5ba2}\u{8beb}\u{51a0}\u{8bec}\u{8bed}\u{6241}\u{8884}\u{7956}\u{795e}\u{795d}\u{7960}\u{8bef}\u{8bf1}\u{8bf2}\u{8bf4}\u{8bf5}\u{57a6}\u{9000}\u{65e2}\u{5c4b}\u{663c}\u{5c4f}\u{5c4e}\u{8d39}\u{9661}\u{900a}\u{7709}\u{5b69}\u{9668}\u{9664}\u{9669}\u{9662}\u{5a03}\u{59e5}\u{59e8}\u{59fb}\u{5a07}\u{59da}\u{5a1c}\u{6012}\u{67b6}\u{8d3a}\u{76c8}\u{52c7}\u{6020}\u{7678}\u{86a4}\u{67d4}\u{5792}\u{7ed1}\u{7ed2}\u{7ed3}\u{7ed5}\u{9a84}\u{7ed8}\u{7ed9}\u{7eda}\u{9a86}\u{7edc}\u{7edd}\u{7ede}\u{9a87}\u{7edf}\u{8015}\u{8018}\u{8017}\u{8019}\u{8273}\u{6cf0}\u{79e6}\u{73e0}\u{73ed}\u{7d20}\u{533f}\u{8695}\u{987d}\u{76cf}\u{532a}\u{635e}\u{683d}\u{6355}\u{57c2}\u{6342}\u{632f}\u{8f7d}\u{8d76}\u{8d77}\u{76d0}\u{634e}\u{634d}\u{634f}\u{57cb}\u{6349}\u{6346}\u{6350}\u{635f}\u{8881}\u{634c}\u{90fd}\u{54f2}\u{901d}\u{6361}\u{632b}\u{6362}\u{633d}\u{631a}\u{70ed}\u{6050}\u{6363}\u{58f6}\u{6345}\u{57c3}\u{6328}\u{803b}\u{803f}\u{803d}\u{8042}\u{606d}\u{83bd}\u{83b1}\u{83b2}\u{83ab}\u{8389}\u{8377}\u{83b7}\u{664b}\u{6076}\u{83b9}\u{83ba}\u{771f}\u{6846}\u{6886}\u{6842}\u{6854}\u{6816}\u{6863}\u{6850}\u{682a}\u{6865}\u{6866}\u{6813}\u{6843}\u{683c}\u{6869}\u{6821}\u{6838}\u{6837}\u{6839}\u{7d22}\u{54e5}\u{901f}\u{9017}\u{6817}\u{8d3e}\u{914c}\u{914d}\u{7fc5}\u{8fb1}\u{5507}\u{590f}\u{7838}\u{7830}\u{783e}\u{7840}\u{7834}\u{539f}\u{5957}\u{9010}\u{70c8}\u{6b8a}\u{6b89}\u{987e}\u{8f7f}\u{8f83}\u{987f}\u{6bd9}\u{81f4}\u{67f4}\u{684c}\u{8651}\u{76d1}\u{7d27}\u{515a}\u{901e}\u{6652}\u{7720}\u{6653}\u{54ee}\u{5520}\u{9e2d}\u{6643}\u{54fa}\u{664c}\u{5254}\u{6655}\u{868c}\u{7554}\u{86a3}\u{868a}\u{86aa}\u{8693}\u{54e8}\u{54e9}\u{5703}\u{54ed}\u{54e6}\u{6069}\u{9e2f}\u{5524}\u{5501}\u{54fc}\u{5527}\u{554a}\u{5509}\u{5506}\u{7f62}\u{5ced}\u{5ce8}\u{5cf0}\u{5706}\u{5cfb}\u{8d3c}\u{8d3f}\u{8d42}\u{8d43}\u{94b1}\u{94b3}\u{94bb}\u{94be}\u{94c1}\u{94c3}\u{94c5}\u{7f3a}\u{6c27}\u{6c28}\u{7279}\u{727a}\u{9020}\u{4e58}\u{654c}\u{79e4}\u{79df}\u{79ef}\u{79e7}\u{79e9}\u{79f0}\u{79d8}\u{900f}\u{7b14}\u{7b11}\u{7b0b}\u{503a}\u{501f}\u{503c}\u{501a}\u{4ffa}\u{503e}\u{5012}\u{5018}\u{4ff1}\u{5021}\u{5019}\u{8d41}\u{4fef}\u{500d}\u{5026}\u{5065}\u{81ed}\u{5c04}\u{8eac}\u{606f}\u{5014}\u{5f92}\u{5f90}\u{6bb7}\u{8230}\u{8231}\u{822c}\u{822a}\u{9014}\u{62ff}\u{8038}\u{7239}\u{8200}\u{7231}\u{8c7a}\u{8c79}\u{9881}\u{9882}\u{7fc1}\u{80f0}\u{8106}\u{8102}\u{80f8}\u{80f3}\u{810f}\u{8110}\u{80f6}\u{8111}\u{8113}\u{901b}\u{72f8}\u{72fc}\u{537f}\u{9022}\u{9e35}\u{7559}\u{9e33}\u{76b1}\u{997f}\u{9981}\u{51cc}\u{51c4}\u{604b}\u{6868}\u{6d46}\u{8870}\u{8877}\u{9ad8}\u{90ed}\u{5e2d}\u{51c6}\u{5ea7}\u{75c7}\u{75c5}\u{75be}\u{658b}\u{75b9}\u{75bc}\u{75b2}\u{810a}\u{6548}\u{79bb}\u{7d0a}\u{5510}\u{74f7}\u{8d44}\u{51c9}\u{7ad9}\u{5256}\u{7ade}\u{90e8}\u{65c1}\u{65c5}\u{755c}\u{9605}\u{7f9e}\u{7f94}\u{74f6}\u{62f3}\u{7c89}\u{6599}\u{76ca}\u{517c}\u{70e4}\u{70d8}\u{70e6}\u{70e7}\u{70db}\u{70df}\u{70d9}\u{9012}\u{6d9b}\u{6d59}\u{6d9d}\u{6d66}\u{9152}\u{6d89}\u{6d88}\u{6da1}\u{6d69}\u{6d77}\u{6d82}\u{6d74}\u{6d6e}\u{6da3}\u{6da4}\u{6d41}\u{6da6}\u{6da7}\u{6d95}\u{6d6a}\u{6d78}\u{6da8}\u{70eb}\u{6da9}\u{6d8c}\u{6096}\u{609f}\u{6084}\u{608d}\u{6094}\u{60af}\u{60a6}\u{5bb3}\u{5bbd}\u{5bb6}\u{5bb5}\u{5bb4}\u{5bbe}\u{7a8d}\u{7a84}\u{5bb9}\u{5bb0}\u{6848}\u{8bf7}\u{6717}\u{8bf8}\u{8bfa}\u{8bfb}\u{6247}\u{8bfd}\u{889c}\u{8896}\u{888d}\u{88ab}\u{7965}\u{8bfe}\u{51a5}\u{8c01}\u{8c03}\u{51a4}\u{8c05}\u{8c06}\u{8c08}\u{8c0a}\u{5265}\u{6073}\u{5c55}\u{5267}\u{5c51}\u{5f31}\u{9675}\u{795f}\u{9676}\u{9677}\u{966a}\u{5a31}\u{5a1f}\u{6055}\u{5a25}\u{5a18}\u{901a}\u{80fd}\u{96be}\u{9884}\u{6851}\u{7ee2}\u{7ee3}\u{9a8c}\u{7ee7}\u{9a8f}\u{7403}\u{7410}\u{7406}\u{7409}\u{7405}\u{6367}\u{5835}\u{63aa}\u{63cf}\u{57df}\u{637a}\u{63a9}\u{6377}\u{6392}\u{7109}\u{6389}\u{6376}\u{8d66}\u{5806}\u{63a8}\u{57e0}\u{6380}\u{6388}\u{637b}\u{6559}\u{638f}\u{6390}\u{63a0}\u{6382}\u{57f9}\u{63a5}\u{63b7}\u{63a7}\u{63a2}\u{636e}\u{6398}\u{63ba}\u{804c}\u{57fa}\u{8046}\u{52d8}\u{804a}\u{5a36}\u{8457}\u{83f1}\u{52d2}\u{9ec4}\u{83f2}\u{840c}\u{841d}\u{83cc}\u{840e}\u{83dc}\u{8404}\u{83ca}\u{83e9}\u{840d}\u{83e0}\u{8424}\u{8425}\u{4e7e}\u{8427}\u{8428}\u{83c7}\u{68b0}\u{5f6c}\u{68a6}\u{5a6a}\u{6897}\u{68a7}\u{68a2}\u{6885}\u{68c0}\u{68b3}\u{68af}\u{6876}\u{68ad}\u{6551}\u{66f9}\u{526f}\u{7968}\u{915d}\u{9157}\u{53a2}\u{621a}\u{7845}\u{7855}\u{5962}\u{76d4}\u{723d}\u{804b}\u{88ad}\u{76db}\u{533e}\u{96ea}\u{8f85}\u{8f86}\u{9885}\u{865a}\u{5f6a}\u{96c0}\u{5802}\u{5e38}\u{7736}\u{5319}\u{6668}\u{7741}\u{772f}\u{773c}\u{60ac}\u{91ce}\u{556a}\u{5566}\u{66fc}\u{6666}\u{665a}\u{5544}\u{5561}\u{8ddd}\u{8dbe}\u{5543}\u{8dc3}\u{7565}\u{86af}\u{86c0}\u{86c7}\u{552c}\u{7d2f}\u{9102}\u{5531}\u{60a3}\u{5570}\u{553e}\u{552f}\u{5564}\u{5565}\u{5578}\u{5d16}\u{5d0e}\u{5d2d}\u{903b}\u{5d14}\u{5e37}\u{5d29}\u{5d07}\u{5d1b}\u{5a74}\u{5708}\u{94d0}\u{94db}\u{94dd}\u{94dc}\u{94ed}\u{94f2}\u{94f6}\u{77eb}\u{751c}\u{79f8}\u{68a8}\u{7281}\u{79fd}\u{79fb}\u{7b28}\u{7b3c}\u{7b1b}\u{7b19}\u{7b26}\u{7b2c}\u{654f}\u{505a}\u{888b}\u{60a0}\u{507f}\u{5076}\u{504e}\u{5077}\u{60a8}\u{552e}\u{505c}\u{504f}\u{8eaf}\u{515c}\u{5047}\u{8845}\u{5f98}\u{5f99}\u{5f97}\u{8854}\u{76d8}\u{8236}\u{8239}\u{8235}\u{659c}\u{76d2}\u{9e3d}\u{655b}\u{6089}\u{6b32}\u{5f69}\u{9886}\u{811a}\u{8116}\u{812f}\u{8c5a}\u{8138}\u{8131}\u{8c61}\u{591f}\u{9038}\u{731c}\u{732a}\u{730e}\u{732b}\u{51f0}\u{7316}\u{731b}\u{796d}\u{9985}\u{9986}\u{51d1}\u{51cf}\u{6beb}\u{70f9}\u{5eb6}\u{9ebb}\u{5eb5}\u{75ca}\u{75d2}\u{75d5}\u{5eca}\u{5eb7}\u{5eb8}\u{9e7f}\u{76d7}\u{7ae0}\u{7adf}\u{5546}\u{65cf}\u{65cb}\u{671b}\u{7387}\u{960e}\u{9610}\u{7740}\u{7f9a}\u{76d6}\u{7737}\u{7c98}\u{7c97}\u{7c92}\u{65ad}\u{526a}\u{517d}\u{710a}\u{7115}\u{6e05}\u{6dfb}\u{9e3f}\u{6dcb}\u{6daf}\u{6df9}\u{6e20}\u{6e10}\u{6dd1}\u{6dcc}\u{6df7}\u{6dee}\u{6dc6}\u{6e0a}\u{6deb}\u{6e14}\u{6dd8}\u{6df3}\u{6db2}\u{6de4}\u{6de1}\u{6dc0}\u{6df1}\u{6dae}\u{6db5}\u{5a46}\u{6881}\u{6e17}\u{60c5}\u{60dc}\u{60ed}\u{60bc}\u{60e7}\u{60d5}\u{60df}\u{60ca}\u{60e6}\u{60b4}\u{60cb}\u{60e8}\u{60ef}\u{5bc7}\u{5bc5}\u{5bc4}\u{5bc2}\u{5bbf}\u{7a92}\u{7a91}\u{5bc6}\u{8c0b}\u{8c0d}\u{8c0e}\u{8c10}\u{88b1}\u{7977}\u{7978}\u{8c13}\u{8c1a}\u{8c1c}\u{902e}\u{6562}\u{5c09}\u{5c60}\u{5f39}\u{968b}\u{5815}\u{968f}\u{86cb}\u{9685}\u{9686}\u{9690}\u{5a5a}\u{5a76}\u{5a49}\u{9887}\u{9888}\u{7ee9}\u{7eea}\u{7eed}\u{9a91}\u{7ef0}\u{7ef3}\u{7ef4}\u{7ef5}\u{7ef7}\u{7ef8}\u{7efc}\u{7efd}\u{7eff}\u{7f00}\u{5de2}\u{7434}\u{7433}\u{7422}\u{743c}\u{6591}\u{66ff}\u{63cd}\u{6b3e}\u{582a}\u{5854}\u{642d}\u{5830}\u{63e9}\u{8d8a}\u{8d81}\u{8d8b}\u{8d85}\u{63fd}\u{5824}\u{63d0}\u{535a}\u{63ed}\u{559c}\u{5f6d}\u{63e3}\u{63d2}\u{63ea}\u{641c}\u{716e}\u{63f4}\u{6400}\u{88c1}\u{6401}\u{6413}\u{6402}\u{6405}\u{58f9}\u{63e1}\u{6414}\u{63c9}\u{65af}\u{671f}\u{6b3a}\u{8054}\u{846b}\u{6563}\u{60f9}\u{846c}\u{52df}\u{845b}\u{8463}\u{8461}\u{656c}\u{8471}\u{848b}\u{8482}\u{843d}\u{97e9}\u{671d}\u{8f9c}\u{8475}\u{68d2}\u{68f1}\u{68cb}\u{6930}\u{690d}\u{68ee}\u{711a}\u{6905}\u{6912}\u{68f5}\u{68cd}\u{690e}\u{68c9}\u{68da}\u{68d5}\u{68fa}\u{6994}\u{692d}\u{60e0}\u{60d1}\u{903c}\u{7c9f}\u{68d8}\u{9163}\u{9165}\u{53a8}\u{53a6}\u{786c}\u{785d}\u{786e}\u{786b}\u{96c1}\u{6b96}\u{88c2}\u{96c4}\u{988a}\u{96f3}\u{6682}\u{96c5}\u{7fd8}\u{8f88}\u{60b2}\u{7d2b}\u{51ff}\u{8f89}\u{655e}\u{68e0}\u{8d4f}\u{638c}\u{6674}\u{7750}\u{6691}\u{6700}\u{6670}\u{91cf}\u{9f0e}\u{55b7}\u{55b3}\u{6676}\u{5587}\u{9047}\u{558a}\u{904f}\u{667e}\u{666f}\u{7574}\u{8df5}\u{8dcb}\u{8dcc}\u{8dd1}\u{8ddb}\u{9057}\u{86d9}\u{86db}\u{8713}\u{8712}\u{86e4}\u{559d}\u{9e43}\u{5582}\u{5598}\u{5589}\u{55bb}\u{557c}\u{55a7}\u{5d4c}\u{5e45}\u{5e3d}\u{8d4b}\u{8d4c}\u{8d4e}\u{8d50}\u{8d54}\u{9ed1}\u{94f8}\u{94fa}\u{94fe}\u{9500}\u{9501}\u{9504}\u{9505}\u{9508}\u{950b}\u{950c}\u{9510}\u{7525}\u{63b0}\u{77ed}\u{667a}\u{6c2e}\u{6bef}\u{6c2f}\u{9e45}\u{5269}\u{7a0d}\u{7a0b}\u{7a00}\u{7a0e}\u{7b50}\u{7b49}\u{7b51}\u{7b56}\u{7b5b}\u{7b52}\u{7b4f}\u{7b54}\u{7b4b}\u{7b5d}\u{50b2}\u{5085}\u{724c}\u{5821}\u{96c6}\u{7126}\u{508d}\u{50a8}\u{7693}\u{7696}\u{7ca4}\u{5965}\u{8857}\u{60e9}\u{5fa1}\u{5faa}\u{8247}\u{8212}\u{903e}\u{756a}\u{91ca}\u{79bd}\u{814a}\u{813e}\u{814b}\u{8154}\u{8155}\u{9c81}\u{7329}\u{732c}\u{733e}\u{7334}\u{60eb}\u{7136}\u{9988}\u{998b}\u{88c5}\u{86ee}\u{5c31}\u{6566}\u{658c}\u{75d8}\u{75e2}\u{75ea}\u{75db}\u{7ae5}\u{7ae3}\u{9614}\u{5584}\u{7fd4}\u{7fa1}\u{666e}\u{7caa}\u{5c0a}\u{5960}\u{9053}\u{9042}\u{66fe}\u{7130}\u{6e2f}\u{6ede}\u{6e56}\u{6e58}\u{6e23}\u{6e24}\u{6e3a}\u{6e7f}\u{6e29}\u{6e34}\u{6e83}\u{6e85}\u{6ed1}\u{6e43}\u{6e1d}\u{6e7e}\u{6e21}\u{6e38}\u{6ecb}\u{6e32}\u{6e89}\u{6124}\u{614c}\u{60f0}\u{6115}\u{6123}\u{60f6}\u{6127}\u{6109}\u{6168}\u{5272}\u{5bd2}\u{5bcc}\u{5bd3}\u{7a9c}\u{7a9d}\u{7a96}\u{7a97}\u{7a98}\u{904d}\u{96c7}\u{88d5}\u{88e4}\u{88d9}\u{7985}\u{7984}\u{8c22}\u{8c23}\u{8c24}\u{8c26}\u{7280}\u{5c5e}\u{5c61}\u{5f3a}\u{7ca5}\u{758f}\u{9694}\u{9699}\u{9698}\u{5a92}\u{7d6e}\u{5ac2}\u{5a9a}\u{5a7f}\u{767b}\u{7f05}\u{7f06}\u{7f09}\u{7f0e}\u{7f13}\u{7f14}\u{7f15}\u{9a97}\u{7f16}\u{9a9a}\u{7f18}\u{745f}\u{9e49}\u{745e}\u{7470}\u{7459}\u{9b42}\u{8086}\u{6444}\u{6478}\u{586b}\u{640f}\u{584c}\u{9f13}\u{6446}\u{643a}\u{642c}\u{6447}\u{641e}\u{5858}\u{644a}\u{8058}\u{659f}\u{849c}\u{52e4}\u{9774}\u{9776}\u{9e4a}\u{84dd}\u{5893}\u{5e55}\u{84ec}\u{84c4}\u{84b2}\u{84c9}\u{8499}\u{84b8}\u{732e}\u{693f}\u{7981}\u{695a}\u{6977}\u{6984}\u{60f3}\u{69d0}\u{6986}\u{697c}\u{6982}\u{8d56}\u{916a}\u{916c}\u{611f}\u{788d}\u{7898}\u{7891}\u{788e}\u{78b0}\u{7897}\u{788c}\u{5c34}\u{96f7}\u{96f6}\u{96fe}\u{96f9}\u{8f90}\u{8f91}\u{8f93}\u{7763}\u{9891}\u{9f84}\u{9274}\u{775b}\u{7779}\u{7766}\u{7784}\u{776b}\u{7761}\u{776c}\u{55dc}\u{9119}\u{55e6}\u{611a}\u{6696}\u{76df}\u{6b47}\u{6697}\u{6687}\u{7167}\u{7578}\u{8de8}\u{8df7}\u{8df3}\u{8dfa}\u{8dea}\u{8def}\u{8de4}\u{8ddf}\u{9063}\u{8708}\u{8717}\u{86fe}\u{8702}\u{8715}\u{55c5}\u{55e1}\u{55d3}\u{7f72}\u{7f6e}\u{7f6a}\u{7f69}\u{8700}\u{5e4c}\u{9519}\u{951a}\u{9521}\u{9523}\u{9524}\u{9525}\u{9526}\u{952e}\u{952f}\u{9530}\u{77ee}\u{8f9e}\u{7a1a}\u{7a20}\u{9893}\u{6101}\u{7b79}\u{7b7e}\u{7b80}\u{7b77}\u{6bc1}\u{8205}\u{9f20}\u{50ac}\u{50bb}\u{50cf}\u{8eb2}\u{9b41}\u{8859}\u{5fae}\u{6108}\u{9065}\u{817b}\u{8170}\u{8165}\u{816e}\u{8179}\u{817a}\u{9e4f}\u{817e}\u{817f}\u{9c8d}\u{733f}\u{9896}\u{89e6}\u{89e3}\u{715e}\u{96cf}\u{998d}\u{998f}\u{9171}\u{7980}\u{75f9}\u{5ed3}\u{75f4}\u{75f0}\u{5ec9}\u{9756}\u{65b0}\u{97f5}\u{610f}\u{8a8a}\u{7cae}\u{6570}\u{714e}\u{5851}\u{6148}\u{7164}\u{714c}\u{6ee1}\u{6f20}\u{6ec7}\u{6e90}\u{6ee4}\u{6ee5}\u{6ed4}\u{6eaa}\u{6e9c}\u{6f13}\u{6eda}\u{6ea2}\u{6eaf}\u{6ee8}\u{6eb6}\u{6eba}\u{7cb1}\u{6ee9}\u{614e}\u{8a89}\u{585e}\u{5bde}\u{7aa5}\u{7a9f}\u{5bdd}\u{8c28}\u{8902}\u{88f8}\u{798f}\u{8c2c}\u{7fa4}\u{6bbf}\u{8f9f}\u{969c}\u{5ab3}\u{5ac9}\u{5acc}\u{5ac1}\u{53e0}\u{7f1a}\u{7f1d}\u{7f20}\u{7f24}\u{527f}\u{9759}\u{78a7}\u{7483}\u{8d58}\u{71ac}\u{5899}\u{589f}\u{5609}\u{6467}\u{8d6b}\u{622a}\u{8a93}\u{5883}\u{6458}\u{6454}\u{6487}\u{805a}\u{6155}\u{66ae}\u{6479}\u{8513}\u{8511}\u{8521}\u{8517}\u{853d}\u{853c}\u{7199}\u{851a}\u{5162}\u{6a21}\u{69db}\u{69b4}\u{699c}\u{69a8}\u{6995}\u{6b4c}\u{906d}\u{9175}\u{9177}\u{917f}\u{9178}\u{789f}\u{78b1}\u{78b3}\u{78c1}\u{613f}\u{9700}\u{8f96}\u{8f97}\u{96cc}\u{88f3}\u{9897}\u{7785}\u{5885}\u{55fd}\u{8e0a}\u{873b}\u{8721}\u{8747}\u{8718}\u{8749}\u{561b}\u{5600}\u{8d5a}\u{9539}\u{953b}\u{9540}\u{821e}\u{8214}\u{7a33}\u{718f}\u{7b95}\u{7b97}\u{7ba9}\u{7ba1}\u{7bab}\u{8206}\u{50da}\u{50e7}\u{9f3b}\u{9b44}\u{9b45}\u{8c8c}\u{819c}\u{818a}\u{8180}\u{9c9c}\u{7591}\u{5b75}\u{9992}\u{88f9}\u{6572}\u{8c6a}\u{818f}\u{906e}\u{8150}\u{7629}\u{761f}\u{7626}\u{8fa3}\u{5f70}\u{7aed}\u{7aef}\u{65d7}\u{7cbe}\u{7cb9}\u{6b49}\u{5f0a}\u{7184}\u{7194}\u{717d}\u{6f47}\u{6f06}\u{6f31}\u{6f02}\u{6f2b}\u{6ef4}\u{6f3e}\u{6f14}\u{6f0f}\u{6162}\u{6177}\u{5be8}\u{8d5b}\u{5be1}\u{5bdf}\u{871c}\u{5be5}\u{8c2d}\u{8087}\u{8910}\u{892a}\u{8c31}\u{96a7}\u{5ae9}\u{7fe0}\u{718a}\u{51f3}\u{9aa1}\u{7f29}\u{6167}\u{64b5}\u{6495}\u{6492}\u{64a9}\u{8da3}\u{8d9f}\u{6491}\u{64ae}\u{64ac}\u{64ad}\u{64d2}\u{58a9}\u{649e}\u{64a4}\u{589e}\u{64b0}\u{806a}\u{978b}\u{978d}\u{8549}\u{854a}\u{852c}\u{8574}\u{6a2a}\u{69fd}\u{6a31}\u{6a61}\u{6a1f}\u{6a44}\u{6577}\u{8c4c}\u{98d8}\u{918b}\u{9187}\u{9189}\u{78d5}\u{78ca}\u{78c5}\u{78be}\u{9707}\u{9704}\u{9709}\u{7792}\u{9898}\u{66b4}\u{778e}\u{563b}\u{5636}\u{5632}\u{5639}\u{5f71}\u{8e22}\u{8e0f}\u{8e29}\u{8e2a}\u{8776}\u{8774}\u{8760}\u{874e}\u{874c}\u{8757}\u{8759}\u{563f}\u{5631}\u{5e62}\u{58a8}\u{9547}\u{9550}\u{9551}\u{9760}\u{7a3d}\u{7a3b}\u{9ece}\u{7a3f}\u{7a3c}\u{7bb1}\u{7bd3}\u{7bad}\u{7bc7}\u{50f5}\u{8eba}\u{50fb}\u{5fb7}\u{8258}\u{819d}\u{819b}\u{9ca4}\u{9cab}\u{719f}\u{6469}\u{8912}\u{762a}\u{7624}\u{762b}\u{51db}\u{989c}\u{6bc5}\u{7cca}\u{9075}\u{618b}\u{6f5c}\u{6f8e}\u{6f6e}\u{6f6d}\u{9ca8}\u{6fb3}\u{6f58}\u{6f88}\u{6f9c}\u{6f84}\u{61c2}\u{6194}\u{61ca}\u{618e}\u{989d}\u{7fe9}\u{8925}\u{8c34}\u{9e64}\u{61a8}\u{6170}\u{5288}\u{5c65}\u{8c6b}\u{7f2d}\u{64bc}\u{64c2}\u{64cd}\u{64c5}\u{71d5}\u{857e}\u{85af}\u{859b}\u{8587}\u{64ce}\u{85aa}\u{8584}\u{98a0}\u{7ff0}\u{5669}\u{6a71}\u{6a59}\u{6a58}\u{6574}\u{878d}\u{74e2}\u{9192}\u{970d}\u{970e}\u{8f99}\u{5180}\u{9910}\u{5634}\u{8e31}\u{8e44}\u{8e42}\u{87c6}\u{8783}\u{5668}\u{566a}\u{9e66}\u{8d60}\u{9ed8}\u{9ed4}\u{955c}\u{8d5e}\u{7a46}\u{7bee}\u{7be1}\u{7bf7}\u{7bf1}\u{5112}\u{9080}\u{8861}\u{81a8}\u{96d5}\u{9cb8}\u{78e8}\u{763e}\u{7638}\u{51dd}\u{8fa8}\u{8fa9}\u{7cd9}\u{7cd6}\u{7cd5}\u{71c3}\u{6fd2}\u{6fa1}\u{6fc0}\u{61d2}\u{61be}\u{61c8}\u{7abf}\u{58c1}\u{907f}\u{7f30}\u{7f34}\u{6234}\u{64e6}\u{85c9}\u{97a0}\u{85cf}\u{85d0}\u{6aac}\u{6a90}\u{6a80}\u{7901}\u{78f7}\u{971c}\u{971e}\u{77ad}\u{77a7}\u{77ac}\u{77b3}\u{77a9}\u{77aa}\u{66d9}\u{8e4b}\u{8e48}\u{87ba}\u{87cb}\u{87c0}\u{568e}\u{8d61}\u{7a57}\u{9b4f}\u{7c27}\u{7c07}\u{7e41}\u{5fbd}\u{7235}\u{6726}\u{81ca}\u{9cc4}\u{764c}\u{8fab}\u{8d62}\u{7cdf}\u{7ce0}\u{71e5}\u{61e6}\u{8c41}\u{81c0}\u{81c2}\u{7ffc}\u{9aa4}\u{85d5}\u{97ad}\u{85e4}\u{8986}\u{77bb}\u{8e66}\u{56a3}\u{9570}\u{7ffb}\u{9ccd}\u{9e70}\u{7011}\u{895f}\u{74a7}\u{6233}\u{5b7d}\u{8b66}\u{8611}\u{85fb}\u{6500}\u{66dd}\u{8e72}\u{8e6d}\u{8e6c}\u{5dc5}\u{7c38}\u{7c3f}\u{87f9}\u{98a4}\u{9761}\u{7663}\u{74e3}\u{7fb9}\u{9cd6}\u{7206}\u{7586}\u{9b13}\u{58e4}\u{99a8}\u{8000}\u{8e81}\u{8815}\u{56bc}\u{56b7}\u{5dcd}\u{7c4d}\u{9cde}\u{9b54}\u{7cef}\u{704c}\u{8b6c}\u{8822}\u{9738}\u{9732}\u{9739}\u{8e8f}\u{9eef}\u{9ad3}\u{8d63}\u{56ca}\u{9576}\u{74e4}\u{7f50}\u{77d7}';

function hex_decode(s) {
    const a = Array.from(
        ''.concat(...s.toUpperCase().matchAll(HEX_PATTERN, "g")),
        (c) => HEX_CHARS.indexOf(c));
    return new Uint8Array(
        Array.from(new Array(Math.floor((a.length + 1) / 2))).map(
            function(_, index) {
                const b = a.slice(2*index, 2*index+2);
                b.push(0);
                return (b[0]<<4)|b[1];
            }
        ));
}

function base32_decode(s) {
    const a = Array.from(
        ''.concat(...s.toUpperCase().matchAll(BASE32_PATTERN, "g")),
        (c) => BASE32_CHARS.indexOf(c));
    return new Uint8Array(
        Array.from(new Array(Math.floor((a.length + 7) / 8))).map(
            function(_, index) {
                const b = a.slice(8*index, 8*index+8);
                b.push(0,0,0,0,0,0,0);
                return [(b[0]<<3)|(b[1]>>2),
                        (b[1]<<6)|(b[2]<<1)|(b[3]>>4),
                        (b[3]<<4)|(b[4]>>1),
                        (b[4]<<7)|(b[5]<<2)|(b[6]>>3),
                        (b[6]<<5)|b[7]
                       ];
            }
        ).flat());
}

async function hotp(alg, key, counter) {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setBigUint64(0, BigInt(counter));
    const hmac_key = await window.crypto.subtle.importKey(
        "raw",
        key,
        {"name": "HMAC",
         "hash": alg.hash},
        true,
        ['sign', 'verify']);

    const signed = await window.crypto.subtle.sign("HMAC", hmac_key, buffer);
    const a = new Uint8Array(signed);
    const b = new DataView(signed).getUint32(a[a.length-1] & 0xF) & 0x7FFFFFFF;
    return b.toString().slice(-alg.digits).padStart(alg.digits, '0');
}

async function totp(alg, key) {
    const t = Math.floor(Date.now() / 1000 / alg.step);
    const T = t - alg.start;
    const result = await hotp(alg, key, T);
    return [result, new Date((t+1) * alg.step * 1000)];
}

async function derive_totp(profile) {
    const key = profile.key;
    const code = key.code || DEFAULT_KEY_ENCODING;
    const decoded = (code==='base32')?base32_decode(key.value):((key.code==='hex')&&hex_decode(key.value));
    const name = profile.alg.name || DEFAULT_TOTP_ALG;
    const alg = Object.fromEntries(
        Object.entries(DEFAULT_TOTP_PARAMS[name]).map(([key, val]) => [key, profile.alg[key] || val]),
    );
    const result = await totp(alg, (decoded.length===0)?new Uint8Array([0]):decoded);
    return result;
}

async function import_base_key(password) {
    const encoder = new TextEncoder();
    return await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        DEFAULT_KDF_ALG,
        false,
        ["deriveBits", "deriveKey"],
    );
}

async function decrypt(base_key, data) {
    const salt = data.slice(0, 32);
    const iv = data.slice(32, 48);
    const ciphertext = data.slice(48);
    const alg = {...DEFAULT_KDF_PARAMS[DEFAULT_KDF_ALG]}
    alg.salt = salt;
    const aes_key = await window.crypto.subtle.deriveKey(
        alg, base_key,
        { name: "AES-GCM", length: 128 },
        true,
        ["encrypt", "decrypt"]);
    alg.salt = iv;
    const aad = await window.crypto.subtle.deriveBits(alg, base_key, 128);
    const plaintext = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv, additionalData: aad}, aes_key, ciphertext);
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(plaintext));
}

async function encrypt(base_key, data) {
    const encoder = new TextEncoder();
    const salt = window.crypto.getRandomValues(new Uint8Array(32));
    const alg = {...DEFAULT_KDF_PARAMS[DEFAULT_KDF_ALG]}
    alg.salt = salt;
    const aes_key = await window.crypto.subtle.deriveKey(
        alg, base_key,
        { name: "AES-GCM", length: 128 },
        true,
        ["encrypt", "decrypt"]);

    const encoded = encoder.encode(JSON.stringify(data));
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    alg.salt = iv;
    const aad = await window.crypto.subtle.deriveBits(alg, base_key, 128);
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv, additionalData: aad },
        aes_key,
        encoded,
    );
    const blob = new Blob([salt, iv, encrypted]);
    const buffer = await blob.arrayBuffer();
    return new Uint8Array(buffer);
}

function generate_salt() {
    return Array.from(window.crypto.getRandomValues(new Uint8Array(32)));
}

function get_charset(chars) {
    const code = chars.code || DEFAULT_CHARS_ENCODING;
    switch(code) {
    case '3500':
        return COMMON3500_CHARS;
    case 'cjk':
        return {start: 0x4E00, length: 0x5200};
    case 'base95':
        const disallow = chars.disallow || DEFAULT_CHARS_PARAMS[code].disallow;
        return Array.from(BASE95_CHARS).filter((c) => !disallow.includes(c)).join('');
    }
}

function get_entropy(charset, length) {
    return Math.log2(charset.length) * length;
}

async function derive_password(base_key, profile) {
    const code = profile.kdf.chars.code || DEFAULT_CHARS_ENCODING;
    const charset = get_charset(profile.kdf.chars);
    const length = profile.kdf.chars.length || DEFAULT_CHARS_PARAMS[code].length;
    const bits = Math.ceil(get_entropy(charset, length) / 8) * 8;

    const encoder = new TextEncoder();
    const salt = Uint8Array.from(
        [...profile.kdf.salt,
         0,
         length,
         0,
         ...encoder.encode(profile.site),
         0,
         ...encoder.encode(profile.account)]);
    const name = profile.kdf.alg.name || DEFAULT_KDF_ALG;
    const alg = Object.fromEntries(
        Object.entries(DEFAULT_KDF_PARAMS[name]).map(([key, val]) => [key, profile.kdf.alg[key] || val]),
    );
    alg.salt = salt;

    const derived = await window.crypto.subtle.deriveBits(alg, base_key, bits);
    let number = new Uint8Array(derived).reduce((acc, v) => acc * 256n + BigInt(v), 0n);

    const char_array = [];

    const size = BigInt(charset.length);
    const isstring = typeof charset === 'string';

    while (number > 0n) {
        const index = Number(number % size);
        const c = (isstring)?charset.codePointAt(index):(charset.start+index);
        char_array.push(c);
        number /= size;
    }
    return String.fromCodePoint(...char_array).slice(0, length);
}

function mergepatch(x, y) {
    for (const [key, value] of Object.entries(y)) {
        if ((typeof value === 'object') && (value !== null)) {
            if ((typeof x[key] !== 'object') || (x[key] === null))
                x[key] = {};
            mergepatch(x[key], value);
        } else {
            x[key] = value;
        }
    }
}


class Store {
    constructor(key) {
        this.key = key;
    }

    load() {
        try {
            const data = window.localStorage.getItem(this.key);
            return (data===null)?null:new Uint8Array(JSON.parse(data));
        } catch(e) {
            console.log(e);
            return null;
        }
    }

    store(data) {
        window.localStorage.setItem(this.key, JSON.stringify(Array.from(data)));
    }

    clear() {
        window.localStorage.removeItem(this.key);
    }
}

class Vault {
    constructor(store) {
        this.store = store;
        this.base_key = null;
        this.profile_list = [];
        this.encrypted = this.store.load();
    }

    get is_unlocked() {
        return !!this.base_key;
    }

    get has_saved() {
        return !!this.encrypted;
    }

    get is_empty() {
        return this.profile_list.length === 0;
    }

    async save() {
        this.encrypted = await encrypt(this.base_key, this.profile_list);
        this.store.store(this.encrypted);
    }

    export() {
        return new Blob([MAGIC, this.encrypted], {type: 'application/octet-stream'})
    }

    async check_file(blob) {
        const magic = await blob.slice(0, 12).arrayBuffer();
        const decoder = new TextDecoder();
        return decoder.decode(magic) === MAGIC;
    }

    async import_file(blob) {
        const buffer = await blob.slice(12).arrayBuffer();
        return new Uint8Array(buffer);
    }

    async do_import(password, encrypted) {
        const base_key = await import_base_key(password);
        if (!encrypted) {
            this.base_key = base_key;
            this.profile_list = [];
            return;
        }

        const profile_list = await decrypt(base_key, encrypted);
        this.base_key = base_key;
        this.profile_list = profile_list;
    }

    async init(password) {
        await this.do_import(password);
        await this.save();
    }

    async unlock(password) {
        await this.do_import(password, this.encrypted);
    }

    lock() {
        this.base_key = null;
        this.profile_list = null;
    }

    clear() {
        this.lock();
        this.encrypted = null;
        this.store.clear();
    }


    add(profile) {
        this.profile_list.push(profile);
    }

    remove(profile) {
        const index = this.profile_list.indexOf(profile);
        this.profile_list.splice(index, 1);
    }
}

const Tabs = {
    oninit(vnode) {
        vnode.state.active = 0;
    },

    view(vnode) {
        const tabs = vnode.children;
        if (!tabs[vnode.state.active])
            vnode.state.active = vnode.attrs.default || 0;

        return [
            m(CUI.Tabs,
              {align: "left"},
              ...tabs.map(
                  (tab, index) => (
                      tab &&
                          m(CUI.TabItem,
                            {label: tab.label,
                             active: vnode.state.active === index,
                             onclick() { vnode.state.active = index; }}))
              )
             ),
            tabs[vnode.state.active].component
        ];
    }
};

const Form = {
    oninit(vnode) {
        vnode.state.error = null;
    },

    view(vnode) {
        function onsubmit(event) {
            event.preventDefault();
            if (event.submitter.attributes['type'].value !== 'submit') {
                vnode.attrs.do_cancel();
                return;
            }

            const data = new FormData(event.target);
            vnode.state.error = null;
            vnode.attrs.do_submit(data).then(
                function() {
                    m.redraw();
                },
                function(error) {
                    console.log(error);
                    vnode.state.error = error;
                    m.redraw();
                }
            );
        }

        return [
            (vnode.attrs.warning) &&
                m(CUI.Callout,
                  {intent: 'warning',
                   icon: CUI.Icons.ALERT_CIRCLE,
                   content: vnode.attrs.warning}),
            (vnode.attrs.progress) &&
                m(CUI.Callout,
                  {intent: 'positive',
                   icon: CUI.Icons.LOADER,
                   content: vnode.attrs.progress}),
            (vnode.state.error) &&
                m(CUI.Callout,
                  {intent: 'negative',
                   icon: CUI.Icons.FROWN,
                   content: vnode.state.error}),
            m(CUI.Form, {onsubmit}, ...vnode.children),
        ];
    }
};

const span = {
    xs: 12,
    sm: 12,
    md: 6
};

const fluid = true;

const InputField = {
    view(vnode) {
        const name = vnode.attrs.name;
        const attrs = {...vnode.attrs, id: name, fluid};
        const label = attrs.label || name;
        delete attrs.label;
        const component = (attrs.options)?CUI.Select:(attrs.type==='textarea')?CUI.TextArea:CUI.Input;
        if (attrs.type==='textarea')
            delete attrs.type;

        return [
            m(CUI.FormLabel, {for: name}, label, vnode.children),
            m(component, attrs),
        ];
    }
}
function make_button_fields(...buttons) {
    return m(CUI.FormGroup,
             {class: CUI.Classes.ALIGN_RIGHT},
             m(CUI.ControlGroup, ...buttons.map((attrs) => m(CUI.Button, attrs))));
};

function make_input_fields(...inputs) {
    return m(CUI.FormGroup, {span}, ...inputs.map((attrs) => m(InputField, attrs)));
}

const InitForm = {
    oninit(vnode) {
        vnode.state.progress = false;
    },

    view(vnode) {
        async function do_submit(data) {
           vnode.state.progress = true;
            try {
                if (data.get('password') != data.get('password2'))
                    throw "\u{4e24}\u{6b21}\u{8f93}\u{5165}\u{5bc6}\u{7801}\u{4e0d}\u{4e00}\u{81f4}";
                try {
                    await vnode.attrs.vault.init(data.get('password'))
                } catch (e) {
                    console.log(e);
                    throw "\u{5bc6}\u{94a5}\u{751f}\u{6210}\u{5931}\u{8d25}";
                }
            } finally {
                vnode.state.progress = false;
            }
        }

        const disabled = vnode.state.progress;
        return m(Form,
                 {do_submit,
                  progress: disabled && '\u{6b63}\u{5728}\u{751f}\u{6210}\u{5bc6}\u{94a5}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}'},
                 make_input_fields(
                     {label: "\u{4e3b}\u{5bc6}\u{7801}",
                      name: 'password',
                      type: 'password',
                      placeholder: PLACEHOLDER,
                      disabled},
                     {label: "\u{4e3b}\u{5bc6}\u{7801}\u{786e}\u{8ba4}",
                      name: 'password2',
                      type: 'password',
                      placeholder: '\u{91cd}\u{590d}\u{4e00}\u{904d}\u{4e0a}\u{4e00}\u{683c}\u{586b}\u{7684}\u{5bc6}\u{7801}',
                      disabled},
                 ),
                 make_button_fields(
                     {label: "\u{8bbe}\u{7f6e}", type: "submit", intent: "primary", disabled}
                 ));
    }
};

const UnlockForm = {
    oninit(vnode) {
        vnode.state.progress = false;
    },

    view(vnode) {
        async function do_submit(data) {
            vnode.state.progress = true;
            try {
                const password = data.get('password');
                try {
                    await vnode.attrs.vault.unlock(password);
                } catch(e) {
                    console.log(e);
                    throw "\u{5bc6}\u{7801}\u{9519}\u{8bef}";
                }
            } finally {
                vnode.state.progress = false;
            }
        }

        const disabled = vnode.state.progress;
        return m(Form,
                 {do_submit,
                  progress: disabled && "\u{6b63}\u{5728}\u{89e3}\u{9501}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}"},
                 make_input_fields(
                     {label: "\u{4e3b}\u{5bc6}\u{7801}", name: "password", placeholder: PLACEHOLDER, type: "password", disabled}),
                 make_button_fields(
                     {label: "\u{89e3}\u{9501}", type: "submit", intent: "primary", disabled}));
    }
};

const ClearForm = {
    oninit(vnode) {
        vnode.state.isOpen = false;
        vnode.state.progress = false;
    },

    view(vnode) {
        async function do_submit() {
            vnode.attrs.vault.clear();
        }

        const disabled = vnode.state.progress;
        return [
            m(CUI.Button,
              {label: "\u{6e05}\u{9664}\u{6240}\u{6709}\u{5bc6}\u{7801}",
               intent: "negative",
               align: "center",
               onclick() { vnode.state.isOpen = true; }
              }
             ),
            m(CUI.Dialog,
              {title: "\u{786e}\u{5b9a}\u{8981}\u{6e05}\u{9664}\u{5417}\u{ff1f}",
               isOpen: vnode.state.isOpen,
               onClose() { vnode.state.isOpen = false; },
               content:
               m(Form,
                 {do_submit,
                  do_cancel() { vnode.state.isOpen = false; },
                  warning: "\u{6e05}\u{9664}\u{4e4b}\u{540e}\u{5bc6}\u{7801}\u{65e0}\u{6cd5}\u{6062}\u{590d}",
                  progress: disabled && "\u{6b63}\u{5728}\u{6e05}\u{9664}\u{6570}\u{636e}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}"},
                 make_button_fields(
                     {label: "\u{7ee7}\u{7eed}", type: "submit", intent: "negative", disabled},
                     {label: "\u{53d6}\u{6d88}", type: "cancel", intent: "primary", disabled}))
              })
        ];
    }
};

const ImportForm = {
    oninit(vnode) {
        vnode.state.isOpen = false;
        vnode.state.progress = false;
    },

    view(vnode) {
        async function do_submit(data) {
            vnode.state.progress = true;
            try {
                const password = data.get('password');
                const file = data.get('file');
                const vault = vnode.attrs.vault;
                try {
                    const valid = await vault.check_file(file);
                    if (!valid)
                        throw "\u{6587}\u{4ef6}\u{683c}\u{5f0f}\u{9519}\u{8bef}";
                } catch (e) {
                    throw "\u{6587}\u{4ef6}\u{683c}\u{5f0f}\u{9519}\u{8bef}";
                }

                let buffer = null;
                try {
                    buffer = await vault.import_file(file);
                } catch (e) {
                    throw "\u{6587}\u{4ef6}\u{8bfb}\u{53d6}\u{5931}\u{8d25}";
                }

                try {
                    await vault.do_import(password, buffer);
                } catch (e) {
                    throw "\u{5bc6}\u{7801}\u{9519}\u{8bef}";
                }

                try {
                    await vault.save();
                } catch (e) {
                    throw "\u{4fdd}\u{5b58}\u{5931}\u{8d25}";
                }
            } finally {
                vnode.state.progress = false;
            }
        }

        const disabled = vnode.state.progress;
        return m(Form,
                 {do_submit,
                  warning: vnode.attrs.vault.has_saved && "\u{5bfc}\u{5165}\u{540e}\u{5c06}\u{8986}\u{76d6}\u{5f53}\u{524d}\u{4fdd}\u{5b58}\u{7684}\u{5bc6}\u{7801}",
                  progress: disabled && '\u{6b63}\u{5728}\u{5bfc}\u{5165}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}'},
                 make_input_fields(
                     {label: "\u{6587}\u{4ef6}", name: "file", accept: ".bin", type: "file", disabled},
                     {label: "\u{4e3b}\u{5bc6}\u{7801}", name: "password", type: "password", placeholder: PLACEHOLDER, disabled}),
                 make_button_fields(
                     {label: "\u{5bfc}\u{5165}", intent: "primary", type: "submit", disabled}));
    }
};



const PrimaryPassword = {
    oninit(vnode) {
        vnode.state.vault = new Vault(new Store(STORAGE_KEY));
    },

    view(vnode) {
        function do_export() {
            const blob = new Blob([MAGIC, new Uint8Array(JSON.parse(vnode.state.encrypted))], {type: 'application/octet-stream'});
            const link = document.createElement("a");
            link.download = `\u{9ed1}\u{6697}\u{4e4b}\u{73af}-${Date.now()}.bin`
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }

        const vault = vnode.state.vault;
        const is_unlocked = vault.is_unlocked;
        const has_saved = vault.has_saved;

        const tabs = [
            (has_saved)?{label: "\u{89e3}\u{9501}", form: UnlockForm}:
            {label: "\u{8bbe}\u{7f6e}\u{4e3b}\u{5bc6}\u{7801}", form: InitForm},
            {label: "\u{5bfc}\u{5165}", form: ImportForm},
            has_saved && {label: "\u{6e05}\u{9664}", form: ClearForm}
        ];

        return (is_unlocked)?
            m(Manager, {vault}):
            m(CUI.Dialog,
              {isOpen: true,
               hasCloseButton: false,
               content:
               m(Tabs,
                 {},
                 (has_saved)?{label: "\u{89e3}\u{9501}", component: m(UnlockForm, {vault})}:
                 {label: "\u{8bbe}\u{7f6e}\u{4e3b}\u{5bc6}\u{7801}", component: m(InitForm, {vault})},
                 {label: "\u{5bfc}\u{5165}", component: m(ImportForm, {vault})},
                 has_saved && {label: "\u{6e05}\u{9664}", component: m(ClearForm, {vault})}
                )
              }
             );
    }
};

const RemoveForm = {
    oninit(vnode) {
        vnode.state.progress = false;
    },

    view(vnode) {
        async function do_submit(event) {
            vnode.state.progress = true;
            try {
                await vnode.attrs.do_submit(vnode.state.data);
            } finally {
                vnode.state.progress = false;
            }
        }

        const disabled = vnode.state.progress;

        return m(Form,
                 {do_submit,
                  do_cancel: vnode.attrs.do_cancel,
                  progress: disabled && "\u{6b63}\u{5728}\u{4fdd}\u{5b58}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}",
                  warning: "\u{6e05}\u{9664}\u{4e4b}\u{540e}\u{5bc6}\u{7801}\u{65e0}\u{6cd5}\u{6062}\u{590d}",
                 },
                 make_button_fields(
                     {label: "\u{7ee7}\u{7eed}", intent: "negative", type: "submit", disabled},
                     {label: "\u{53d6}\u{6d88}", intent: "primary", type: "cancel", disabled}
                 )
                );
    }
};

function make_config_fields(config, ...fields) {
    const {data, fallback, disabled, onChange} = config;
    return fields.map(
        (attrs) =>
        m(InputField,
          {...attrs,
           disabled: attrs.disabled || disabled,
           value: data[attrs.name] || fallback[attrs.name],
           oninput(e) {
               const fallback_value = fallback[attrs.name];
               const value = (typeof fallback_value === 'number')?Number(e.target.value):e.target.value;
               const changed = value!==fallback_value;
               data[attrs.name] = changed?value:undefined;
               if (onChange)
                   onChange();
           }
          }
         )
    );
}

const PBKDF2Fields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {'name': 'iterations',
             'type': 'number',
             'step': 1,
             'min': 10000},
            {'name': 'hash',
             'options': ['SHA-256', 'SHA-384', 'SHA-512'],
             'step': 1,
             'min': 10000},
        );
    }
};

const ScryptFields = {
    view(vnode) {
        const data = vnode.attrs.data;
        const fallback = vnode.attrs.fallback;
        const r = data.r || fallback.r;
        return make_config_fields(
            vnode.attrs,
            {label: 'N=2^',
             name: 'N',
             type: 'number',
             step: 1,
             min: 1,
             max: 16*r-1},
            {name: 'r',
             type: 'number',
             step: 1,
             min: 1},
            {name: 'p',
             type: 'number',
             step: 1,
             min: 1},
        );
    }
};

const Argon2Fields = {
    view(vnode) {
        const data = vnode.attrs.data;
        const fallback = vnode.attrs.fallback;
        const r = data.r || fallback.r;
        return make_config_fields(
            vnode.attrs,
            {label: 'm',
             name: 'm',
             type: 'number',
             step: 1,
             min: 1},
            {name: 't',
             type: 'number',
             step: 1,
             min: 1},
            {name: 'p',
             type: 'number',
             step: 1,
             min: 1},
        );
    }
};

function make_switch(data_key, switch_key, config, fields, options, default_values) {
    const {data, disabled, onChange} = config;
    const default_choice = (typeof options[0]==='string')?options[0]:options[0].value;
    const choice = data[data_key][switch_key] || default_choice;
    return [
        m(CUI.RadioGroup,
          {id: data_key,
           name: data_key,
           options: options,
           value: choice,
           oninput(e) {
               const value = e.target.value;
               if (value === choice)
                  return;
               data[data_key] = {};
               data[data_key][switch_key] = (value!==default_choice)?value:undefined;
               onChange();
           }
          }),
        fields[choice]&&m(fields[choice],
          {data: data[data_key],
           fallback: default_values[choice],
           disabled, onChange,
          })
    ];
}

function make_alg_switch(config, fields, options, default_params) {
    return m("details",
             m("summary", m(CUI.FormLabel, {for: "alg"}, "\u{5bc6}\u{7801}\u{5b66}\u{7b97}\u{6cd5}\u{ff08}\u{4e0d}\u{4f1a}\u{6539}\u{5c31}\u{4e0d}\u{8981}\u{6539}\u{ff09}")),
             ...make_switch("alg", "name", config, fields, options, default_params));
}

const Base95Fields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {label: "\u{7981}\u{7528}\u{5b57}\u{7b26}",
             name: 'disallow',
             placeholder: "\u{8fd9}\u{79cd}\u{8d27}\u{8272}\u{600e}\u{4e48}\u{80fd}\u{62a2}\u{5728}\u{6211}\u{524d}\u{5934}",
            },
            {label: ["\u{957f}\u{5ea6}:", vnode.attrs.data.length || vnode.attrs.fallback.length],
             name: 'length',
             type: 'range',
             min: 1,
             max: 64,
             step: 1},
        );
    }
};

const LengthFields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {label: ["\u{957f}\u{5ea6}:", vnode.attrs.data.length || vnode.attrs.fallback.length],
             name: 'length',
             type: 'range',
             min: 1,
             max: 64,
             step: 1},
        );
    }
};


const KDFFields = {
    view(vnode) {
        const ALG_FIELDS = {
            PBKDF2: PBKDF2Fields,
            scrypt: ScryptFields,
            Argon2: Argon2Fields,
        };

        const CHARS_FIELDS = {
            base95: Base95Fields,
            3500: LengthFields,
            cjk: LengthFields,
        };

        const password = vnode.attrs.password;

        const bits = (password)&&
              get_entropy(
                  get_charset(vnode.attrs.data.chars),
                  password.length);


        return [
            m(CUI.FormLabel,
              "\u{5bc6}\u{7801}",
              m(CUI.Button,
                {basic: true,
                 iconLeft: CUI.Icons.REFRESH_CW,
                 disabled: !password,
                 onclick() {
                     vnode.attrs.data.salt = generate_salt();
                     vnode.attrs.onChange();
                 }
                })),
            m('div',
              m('code',
                (password)?password:'\u{6b63}\u{5728}\u{751f}\u{6210}\u{8bf7}\u{7a0d}\u{5019}'
               )),
            m(CUI.FormLabel, "\u{5f3a}\u{5ea6}"),
            m('div',
              m('progress', {max:'1024', value:bits}),
             ),
            m(CUI.FormLabel, {for: "chars"}, "\u{5b57}\u{7b26}\u{96c6}"),
            ...make_switch("chars", "code", vnode.attrs, CHARS_FIELDS, CHARS_ENCODINGS, DEFAULT_CHARS_PARAMS),
            make_alg_switch(vnode.attrs, ALG_FIELDS, KDF_ALGS, DEFAULT_KDF_PARAMS)
        ];
    }
};

const OATHFields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {label: "\u{4f4d}\u{6570}",
             name: 'digits',
             type: "length",
             min: 6,
             max: 8,
             step: 1,
            },
            {label: "\u{6709}\u{6548}\u{65f6}\u{957f}(\u{79d2})",
             name: 'step',
             type: 'number',
             min: 1,
             step: 1},
            {label: "hash\u{51fd}\u{6570}",
             name: 'hash',
             options: ['SHA-1', 'SHA-256', 'SHA-512']},
        );
    }
};

const Base32Fields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {label: "key",
             name: 'value',
             pattern: BASE32_PATTERN,
             placeholder: "STARBEMGYERON",
            }
        );
    }
};

const HexFields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {label: "key",
             name: 'value',
             pattern: HEX_PATTERN,
            }
        );
    }
};


const TOTPFields = {
    oninit(vnode) {
        vnode.state.password = null;
        vnode.state.revision = 0;
        vnode.state.time = '';
        vnode.state.interval = null;
    },

    onremove(vnode) {
        if (vnode.state.interval)
            window.clearInterval(vnode.state.interval);
    },

    view(vnode) {
        function onChange() {
            vnode.state.revision += 1;
            if (!vnode.attrs.data.key.value) {
                vnode.state.password = null;
                vnode.state.time = null;
                if (vnode.state.interval)
                    window.clearInterval(vnode.state.interval);
                vnode.state.interval = null;
            }
            if (!(vnode.state.password instanceof Promise)) {
                vnode.state.password = null;
            }
        }

        function update_time() {
            const now = new Date();
            vnode.state.time = "\u{5f53}\u{524d}\u{65f6}\u{95f4}" +(now.toLocaleTimeString());
            if (now > vnode.state.password[1]) {
                vnode.state.password = start();
            }
            m.redraw();
        }

        async function start() {
            while(true) {
                const revision = vnode.state.revision;
                const profile = vnode.attrs.data;
                if (!profile.key.value) {
                    m.redraw();
                    return;
                }
                const password = await derive_totp(profile);
                if (vnode.state.revision === revision) {
                    vnode.state.password = password;
                    if (!vnode.state.interval)
                        vnode.state.interval = window.setInterval(update_time, 1000);
                    update_time();
                    return;
                }
            }
        }

        if (vnode.attrs.data.key.value && !vnode.state.password) {
            vnode.state.password = start();
        }

        const ALG_FIELDS = {
            OATH: OATHFields,
        };

        const KEY_FIELDS = {
            base32: Base32Fields,
            hex: HexFields,
        };

        const password = vnode.state.password;
        const config = {...vnode.attrs, onChange};
        return [
            m(CUI.FormLabel, "\u{5bc6}\u{7801}"),
            (password instanceof Promise)?
                m('div',m('code', '\u{6b63}\u{5728}\u{751f}\u{6210}\u{8bf7}\u{7a0d}\u{5019}')):
                (!password)?
                m('div',m('code')):
                m('div', m('code', password[0]), vnode.state.time, `\u{6709}\u{6548}\u{671f}\u{81f3}${password[1].toLocaleTimeString()}`),
            m(CUI.FormLabel, {for: "key"}, "key\u{7f16}\u{7801}\u{683c}\u{5f0f}"),
            ...make_switch("key", "code", config, KEY_FIELDS, KEY_ENCODINGS, DEFAULT_KEY_PARAMS),
            make_alg_switch(config, ALG_FIELDS, TOTP_ALGS, DEFAULT_TOTP_PARAMS),
        ];
    }
};


const AccountFields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {label: "\u{7f51}\u{7ad9}",
             name: 'site',
             placeholder: '\u{592a}\u{5e73}\u{98a8}\u{571f}\u{8a18}'},
            {label: "\u{5e10}\u{53f7}",
             name: "account",
             placeholder: '\u{9b54}\u{683c}\u{7a76}\u{6781}\u{5927}\u{86c7}'});
    }
}

const BackupFields = {
    view(vnode) {
        return make_config_fields(
            vnode.attrs,
            {label: "\u{5907}\u{7528}\u{5bc6}\u{7801}",
             name: 'bak',
             type: 'textarea',
             rows: '12',
             placeholder: '\u{4f60}\u{4eec}\u{662f}\u{4e0d}\u{662f}\u{628a}\u{6211}\u{7ed9}\u{5fd8}\u{4e86}'});
    }
}


const EditForm = {
    oninit(vnode) {
        vnode.state.progress = false;
        vnode.state.data = {
            kdf: {alg: {},
                  salt: generate_salt(),
                  chars: {}},
            totp: {alg: {},
                   key: {}},
        };
        mergepatch(vnode.state.data, vnode.attrs.saved || {});

        vnode.state.password = null;
        vnode.state.revision = 0;
    },

    view(vnode) {
        function onChange() {
            vnode.state.revision += 1;
            if (!(vnode.state.password instanceof Promise))
                vnode.state.password = null;
        }

        async function start() {
            while(true) {
                const revision = vnode.state.revision;
                try {
                    const password = await derive_password(vnode.attrs.vault.base_key, vnode.state.data);
                    if (vnode.state.revision === revision) {
                        vnode.state.password = password;
                        m.redraw();
                        return;
                    }
                } catch(e) {
                    console.log(e);
                    vnode.state.password = false;
                    m.redraw();
                    return;
                }
            }
        }

        if (vnode.state.password === null) {
            vnode.state.password = start();
        }

        async function do_submit(data) {
            vnode.state.progress = true;
            try {
                await vnode.attrs.do_submit(vnode.state.data);
            } finally {
                vnode.state.progress = false;
            }
        }

        const disabled = vnode.state.progress;
        const saved = vnode.attrs.saved;
        const password = vnode.state.password;

        return m(Form,
                 {do_submit,
                  do_cancel: vnode.attrs.do_cancel,
                  progress: disabled && "\u{6b63}\u{5728}\u{4fdd}\u{5b58}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}",
                  warning: saved && "\u{4fee}\u{6539}\u{4e4b}\u{540e}\u{65e0}\u{6cd5}\u{6062}\u{590d}\u{539f}\u{5bc6}\u{7801}"},
                 m(Tabs,
                   {default: (saved)?1:0},
                   (!saved)&&
                   {label: "\u{57fa}\u{672c}\u{4fe1}\u{606f}",
                    component:
                    m(CUI.FormGroup,
                      m(AccountFields,
                        {data: vnode.state.data,
                         fallback: DEFAULT_PROFILE,
                         onChange, disabled}))},
                   {label:  "\u{5bc6}\u{7801}",
                    component:
                    m(CUI.FormGroup,
                      m(KDFFields,
                        {disabled, onChange,
                         password: (!(password instanceof Promise)) && (password?password:"\u{751f}\u{6210}\u{5931}\u{8d25}:\u{6d4f}\u{89c8}\u{5668}\u{8fd8}\u{4e0d}\u{4f1a}\u{8fd9}\u{79cd}\u{5bc6}\u{7801}\u{5b66}\u{7b97}\u{6cd5}"),
                         data: vnode.state.data.kdf,
                         fallback: DEFAULT_PROFILE.kdf})
                     )
                   },
                   {label: "TOTP",
                    component:
                    m(CUI.FormGroup,
                      m(TOTPFields,
                        {disabled,
                         data: vnode.state.data.totp,
                         fallback: DEFAULT_PROFILE.totp})
                     )
                   },
                   {label: "\u{5907}\u{7528}",
                    component:
                    m(CUI.FormGroup,
                      m(BackupFields,
                        {disabled,
                         data: vnode.state.data,
                         fallback: DEFAULT_PROFILE})
                     )
                   }
                  ),
                 make_button_fields(
                     {label: (saved)?"\u{4fee}\u{6539}":"\u{6dfb}\u{52a0}", type: "submit", intent: "primary",
                      disabled: disabled || !vnode.state.data.account || !vnode.state.data.site},
                     {label: "\u{53d6}\u{6d88}", type: "cancel", disabled})
                );
    }
};

const ExportForm = {
    oninit(vnode) {
        vnode.state.progress = false;
    },
    view(vnode) {
        const disabled = vnode.state.progress;

        async function do_submit(data) {
            vnode.state.progress = true;
            try {
                await vnode.attrs.do_submit(vnode.state.data);
            } finally {
                vnode.state.progress = false;
            }
        }

        return m(Form,
                 {do_submit,
                  do_cancel: vnode.attrs.do_cancel,
                  progress: disabled && "\u{6b63}\u{5728}\u{5bfc}\u{51fa}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}"},
                 make_button_fields(
                     {label: "\u{5bfc}\u{51fa}\u{5e10}\u{53f7}", intent: "primary", type: "submit", disabled},
                     {label: "\u{53d6}\u{6d88}", type: "cancel", disabled}));
    }
};

const SelectList = {
    oninit(vnode) {
        vnode.state.isOpen = true;
    },

    view(vnode) {
        const selectedItem = vnode.attrs.selectedItem;
        const dialog = vnode.attrs.dialogs[vnode.state.isOpen];

        return [
            m("div", {style: "display: flex;"},
              m(CUI.SelectList,
                {popoverAttrs:
                 {isOpen: vnode.state.isOpen === true,
                  onInteraction(nextOpenState) { vnode.state.isOpen = nextOpenState; }},
                 listAttrs: {style: "width: calc( 30em - 30px );"},
                 inputAttrs: {placeholder: vnode.attrs.placeholder},
                 emptyContent: vnode.attrs.emptyContent,
                 closeOnSelect: false,
                 contentRight:
                 vnode.attrs.buttons.map(
                     (item) =>
                     item && (item.onclick || vnode.attrs.dialogs[item.open]) &&
                         m(CUI.Button,
                           {iconLeft: item.icon,
                            onclick(event) {
                                if (item.open) {
                                    vnode.state.isOpen = item.open;
                                } else {
                                    item.onclick(event);
                                }
                            }})),
                 items: vnode.attrs.items,
                 checkmark: true,
                 trigger: vnode.attrs.itemRender(
                     vnode.attrs.selectedItem,
                     {iconRight: CUI.Icons.CHEVRON_DOWN,
                      fluid: true,
                      onclick() {
                          vnode.state.isOpen = true;
                      }
                     }),
                 onSelect(item) {
                     vnode.attrs.onSelect(item);
                     vnode.state.isOpen = false;
                 },
                 itemPredicate: vnode.attrs.itemPredicate,
                 itemRender(item) {
                     return m(CUI.ListItem,
                              {label: vnode.attrs.itemRender(item, {basic: true, fluid: true}),
                               selected: vnode.attrs.selectedItem === item});
                 }
                }),
              (selectedItem) &&
              m(CUI.PopoverMenu,
                {closeOnContentClick: true,
                 trigger:
                 m(CUI.Button,
                   {iconLeft: CUI.Icons.MORE_VERTICAL}),
                 content:
                 vnode.attrs.menu.map(
                     (item) =>
                     m(CUI.MenuItem,
                       {iconLeft: item.icon,
                        label: item.label,
                        intent: item.intent,
                        onclick() { vnode.state.isOpen = item.open; }}))})
             ),
            (vnode.state.isOpen !== true) && (vnode.state.isOpen !== false) && dialog?.form &&
                m(CUI.Dialog,
                  {isOpen: true,
                   title: dialog.title,
                   content:
                   m(dialog.form,
                     {...dialog.attrs,
                      async do_submit(data) {
                          vnode.state.isOpen = await dialog.attrs.do_submit(data);
                      },
                      do_cancel() { vnode.state.isOpen = dialog.open; },
                     }),
                   onClose() { vnode.state.isOpen = dialog.open; }
                  })
        ];
    }
};

function make_copy_view(label, password, profile, notifications, time) {
    return m(CUI.FormGroup, {span},
             m(CUI.FormLabel, label, ": "),
             m(CUI.Button,
               {basic: true,
                fluid: true,
                align: "left",
                iconLeft: CUI.Icons.COPY,
                label: m("code", {class: (!time)&&'invisible'}, (password instanceof Promise)?"\u{6b63}\u{5728}\u{751f}\u{6210}\u{ff0c}\u{8bf7}\u{7a0d}\u{5019}":password[0]),
                disabled: (password instanceof Promise),
                onclick() {
                    const message = `"${profile.site}"\u{5e10}\u{53f7}"${profile.account}"\u{7684}${label}`;
                    navigator.clipboard.writeText(password[0]).then(function() {
                        notifications.push({key: Date.now(), message: `${message}\u{5df2}\u{4e8e}${new Date().toLocaleTimeString()}\u{590d}\u{5236}\u{5230}\u{526a}\u{8d34}\u{677f}`});
                        m.redraw();
                    });
                }}
              ),
             m("div", time),
             m("div", (password instanceof Promise)?"":(password[1]&&`\u{6709}\u{6548}\u{671f}\u{81f3}${password[1].toLocaleTimeString()}`))
            );
}


const Manager = {
    oninit(vnode) {
        vnode.state.selectedItem = null;
        vnode.state.notifications = [];
        vnode.state.passwords = {};
        vnode.state.revision = 0;
        vnode.state.interval = null;
        vnode.state.time = '';
    },

    onremove(vnode) {
        if (vnode.state.interval)
            window.clearInterval(vnode.state.interval);
    },

    view(vnode) {
        const vault = vnode.attrs.vault;
        const selectedItem = vnode.state.selectedItem;

        async function start_kdf() {
            while(true) {
                const revision = vnode.state.revision;
                const password = await derive_password(vault.base_key, vnode.state.selectedItem);
                if (vnode.state.revision === revision) {
                    vnode.state.passwords["kdf"] = [password, ''];
                    m.redraw();
                    return;
                }
            }
        }

        function update_time() {
            const now = new Date();
            vnode.state.time = "\u{5f53}\u{524d}\u{65f6}\u{95f4}" +(now.toLocaleTimeString());
            if (now > vnode.state.passwords.totp[1]) {
                vnode.state.passwords.totp = start_totp();
            }
            m.redraw();
        }

        async function start_totp() {
            while(true) {
                const revision = vnode.state.revision;
                const profile = vnode.state.selectedItem.totp;
                const password = await derive_totp(profile);
                if (vnode.state.revision === revision) {
                    vnode.state.passwords["totp"] = password;
                    if (!vnode.state.interval)
                        vnode.state.interval = window.setInterval(update_time, 1000);
                    update_time();
                    return;
                }
            }
        }

        if (selectedItem) {
            if (!vnode.state.passwords.kdf) {
                vnode.state.passwords.kdf = start_kdf();
            }

            if (selectedItem.totp.key.value && !vnode.state.passwords.totp) {
                vnode.state.passwords.totp = start_totp();
            }
        }

        async function add(info) {
            vnode.attrs.vault.add(info);
            await vnode.attrs.vault.save();
            return true;
        }

        async function edit(info) {
            mergepatch(vnode.state.selectedItem, info);
            vnode.state.passwords = {};
            if (vnode.state.interval)
                window.clearInterval(vnode.state.interval);
            vnode.state.interval = null;
            vnode.state.revision += 1;
            await vnode.attrs.vault.save();
            return false;
        }

        async function remove() {
            vnode.attrs.vault.remove(vnode.state.selectedItem);
            vnode.state.selectedItem = null;
            vnode.state.passwords = {};
            if (vnode.state.interval)
                window.clearInterval(vnode.state.interval);
            vnode.state.interval = null;
            await vnode.attrs.vault.save();
            return true;
        }

        async function do_export() {
            const blob = vnode.attrs.vault.export();
            const link = document.createElement("a");
            link.download = `\u{9ed1}\u{6697}\u{4e4b}\u{73af}-${Date.now()}.bin`
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
            return true;
        }

        const is_empty = vault.is_empty;
        const notifications = vnode.state.notifications;
        const passwords = vnode.state.passwords;

        function onDismiss(key) {
            const index = notifications.findIndex(x => x.key === key);
            notifications.splice(index, 1);
        };

        return [
            m(CUI.Toaster, {
                toasts: notifications.map(
                    notification =>
                    m(CUI.Toast, {
                        key: notification.key,
                        message: notification.message,
                        onDismiss
                    }))
            }),

            m(SelectList,
              {emptyContent: "\u{8fd8}\u{6ca1}\u{6709}\u{4fdd}\u{5b58}\u{4efb}\u{4f55}\u{5e10}\u{53f7}",
               placeholder: "\u{67e5}\u{627e}\u{5e10}\u{53f7}",
               items: vault.profile_list,
               selectedItem: selectedItem,
               onSelect(item) {
                   if (vnode.state.selectedItem === item)
                       return;
                   vnode.state.selectedItem = item;
                   vnode.state.passwords = {};
                   if (vnode.state.interval)
                       window.clearInterval(vnode.state.interval);
                   vnode.state.interval = null;
                   vnode.state.revision += 1;
               },
               itemRender(item, attrs) {
                   return m(CUI.Button, {label: item?.account, sublabel: item?.site, ...attrs});
               },
               itemPredicate(query, item) {
                   return item.account.toLowerCase().includes(query.toLowerCase()) || item.site.toLowerCase().includes(query.toLowerCase());
               },
               buttons: [
                   {icon: CUI.Icons.PLUS, open: "add"},
                   (!is_empty) && {icon: CUI.Icons.DOWNLOAD, open: "export"},
                   {icon: CUI.Icons.LOCK, onclick() { vault.lock(); }}
               ],
               menu: [
                   {icon: CUI.Icons.EDIT, label: "\u{4fee}\u{6539}", open: "edit"},
                   {icon: CUI.Icons.TRASH_2, label: "\u{5220}\u{9664}", intent: "negative", open: "remove"}],
               dialogs:
               {add: {title: "\u{6dfb}\u{52a0}\u{5e10}\u{53f7}", open: true, form: EditForm, attrs: {do_submit: add, vault: vault}},
                edit: (selectedItem) &&
                {title: `\u{4fee}\u{6539}"${selectedItem.site}"\u{5e10}\u{53f7}"${selectedItem.account}"`,
                 open: false, form: EditForm, attrs: {do_submit: edit, saved: selectedItem, vault: vault}},
                remove: (selectedItem) &&
                {title: `\u{5220}\u{9664}"${selectedItem.site}"\u{5e10}\u{53f7}"${selectedItem.account}"`,
                 open: false, form: RemoveForm, attrs: {do_submit: remove}},
                export: (!is_empty)&&{title: "\u{5bfc}\u{51fa}\u{5e10}\u{53f7}", open: true, form: ExportForm, attrs: {do_submit: do_export}}}
              }),
            m(CUI.Form,
              selectedItem && make_copy_view("\u{5bc6}\u{7801}", passwords["kdf"], selectedItem, notifications),
              selectedItem && selectedItem.totp.key.value && make_copy_view("TOTP", passwords["totp"], selectedItem, notifications, vnode.state.time)),
        ];
    }
};


function main() {
    m.mount(document.body, PrimaryPassword);
}

window.addEventListener('load', main);
