import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ORDER BY id
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_new_board(board_title):
    query = f"""
        INSERT INTO boards (title)
        VALUES (%s) 
        """

    return data_manager.execute_dml_statement(query, [board_title])


def edit_board_title(board_title, board_id):
    query = f"""
        UPDATE boards
        SET title = %s
        WHERE id = %s;        
        """
    return data_manager.execute_dml_statement(query, [board_title, board_id])


