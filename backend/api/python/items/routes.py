from flask import jsonify, Blueprint, request, abort
from flask_jwt_extended import jwt_required, current_user

from api import db
from api.python.models import Item
from api.python.items.utils import check_location
# from api.python.items.utils import Unaccent
# from api.python.users.utils import login_required

from unidecode import unidecode
from sqlalchemy import column, func


items = Blueprint('items', __name__)


@items.route('/items/list', methods=["GET"])
@jwt_required()
def list_items():
    items_list = [item.serialize for item in Item.query.all()]
    return jsonify(items_list)


@items.route('/items/register', methods=["POST"])
@jwt_required()
def register_item():
    data = request.get_json()

    room = check_location(data.get('room'))
    storage = check_location(data.get('storage'))
    level = check_location(data.get('level'))
    sublevel = check_location(data.get('sublevel'))

    n_items = len(Item.query.all())
    code = f"{room}{storage}{level}{sublevel}-{str(n_items+1).zfill(4)}"

    new_item = Item(
        code=code,
        name=data.get('name'),
        room=room,
        storage=storage,
        level=level,
        sublevel=sublevel,

        type=data.get('type'),
        asset_number=data.get('asset_number'),
        category=data.get('category'),
        description=data.get('description'),
        sc_number=data.get('sc_number'),

        amount=data.get('amount'),
        high_amount_alarm=data.get('high_amount_alarm'),
        low_amount_alarm=data.get('low_amount_alarm'),

        user_access=data.get('user_access'),
        labeled=data.get('labeled'),
        comments=data.get('comments'),
    )

    db.session.add(new_item)
    db.session.commit()

    return(
        jsonify(
            status=True,
            message="Item registered",
            code=code
        )
    )


@items.route('/items/search', methods=["POST"])
@jwt_required()
def search():
    data = request.get_json()
    search = data.get("search")

    if not search:
        search = ""

    search = search.lower()
    search = " ".join(search.split())
    search_unidecoded = unidecode(search)
    search_unidecoded_splited = search_unidecoded.split(" ")

    name_condition = func.lower(Item.name).contains(
        search_unidecoded_splited[0])
    desc_condition = func.lower(Item.description).contains(
        search_unidecoded_splited[0])
    code_condition = func.lower(Item.code).contains(
        search_unidecoded_splited[0])
    for split in search_unidecoded_splited[1:]:
        name_condition &= func.lower(
            Item.name).contains(split)
        desc_condition &= func.lower(
            Item.description).contains(split)
        code_condition &= func.lower(
            Item.code).contains(split)

    items_query = Item.query.filter(
        (name_condition | desc_condition | code_condition)
    ).order_by(Item.code)

    items_serialize = [
        item_query.serialize for item_query in items_query]

    # data = {'products': products_serialize,
    # 'total_pages': total_pages, 'actual_page': page}
    return(jsonify(items_serialize))
