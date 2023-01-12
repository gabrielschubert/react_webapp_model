from api.config import Development, Production
from api import create_app
import argparse


def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError(
            'Boolean value expected. {True or False}')


parser = argparse.ArgumentParser()
parser.add_argument("-rdb", "--resetdb", dest="resetdb", default=False,
                    help="Reset database", choices=[True, False], type=str2bool)
parser.add_argument("-m", "--mode", dest="mode", default="Production",
                    help="Webapp execution mode", choices=['Development', 'Production'])
parser.add_argument("-p", "--port", dest="port", default=8081,
                    help="Backend port")

args, unknown = parser.parse_known_args()

print(f"\nReset DB: {args.resetdb}\nMode: {args.mode}\n")

if args.mode.lower() == "development":
    mode = Development
else:
    mode = Production

app = create_app(config_class=mode, restart_db=args.resetdb)

if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=args.port)
